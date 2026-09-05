import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, cpSync, chmodSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = mkdtempSync(join(tmpdir(), 'cmc-hook-test-'));
const work = join(root, 'work');
const remote = join(root, 'remote.git');
mkdirSync(work);
function git(args, expected = 0, cwd = work) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  assert.ifError(result.error);
  if (expected === 0) assert.equal(result.status, 0, `${args.join(' ')}\n${result.stderr}`);
  else assert.notEqual(result.status, 0, `Must reject: ${args.join(' ')}`);
  return result.stdout.trim();
}
try {
  git(['init', '--bare', remote]);
  git(['init', '-b', 'main']);
  git(['config', 'user.name', 'Hook Test']);
  git(['config', 'user.email', 'hook-test@example.invalid']);
  writeFileSync(join(work, 'README.md'), 'Temporary hook test\n');
  git(['add', 'README.md']);
  git(['commit', '-m', 'Initialize isolated fixture']);
  git(['remote', 'add', 'origin', remote]);
  git(['push', '-u', 'origin', 'main']);
  cpSync(resolve('.githooks'), join(work, '.githooks'), { recursive: true });
  for (const hook of ['pre-commit', 'pre-merge-commit', 'pre-push', 'reference-transaction']) {
    chmodSync(join(work, '.githooks', hook), 0o755);
  }
  git(['config', 'core.hooksPath', '.githooks']);
  git(['commit', '--allow-empty', '-m', 'Must block main'], 1);
  git(['switch', '-c', 'feature/test']);
  git(['commit', '--allow-empty', '-m', 'Allowed feature']);
  const candidate = git(['rev-parse', 'HEAD']);
  git(['update-ref', 'refs/heads/main', candidate], 1);
  git(['push', 'origin', 'HEAD:main'], 1);
  git(['push', 'origin', 'HEAD:develop'], 1);
  git(['push', 'origin', 'feature/test']);
  // Simulate a reviewed server-side merge in the disposable remote.
  git(['update-ref', 'refs/heads/main', candidate], 0, remote);
  git(['update-ref', 'refs/heads/develop', candidate], 0, remote);
  git(['fetch', 'origin']);
  git(['switch', 'main']);
  git(['merge', '--ff-only', 'origin/main']);
  git(['switch', '-c', 'develop', 'origin/develop']);
  git(['commit', '--allow-empty', '-m', 'Must block develop'], 1);
  git(['switch', '--detach']);
  git(['commit', '--allow-empty', '-m', 'Must block detached'], 1);
  git(['switch', '-c', 'unapproved']);
  git(['commit', '--allow-empty', '-m', 'Must block branch'], 1);
  console.log('PASS: protected commits/updates/pushes blocked; feature commit/push and origin synchronization allowed');
} finally {
  // Only remove the exact newly created temporary fixture directory.
  rmSync(root, { recursive: true, force: true });
}
