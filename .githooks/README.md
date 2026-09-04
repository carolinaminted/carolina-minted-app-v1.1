# Branch Policy Hooks

These versioned hooks enforce the repository's short-lived branch policy for local Git operations, including operations initiated by Codex.

## Activation

From the repository root, configure the hook path for this clone:

```powershell
git config --local core.hooksPath .githooks
```

On Linux or macOS, also make the hook entry points executable if the checkout did not preserve their executable mode:

```bash
chmod +x .githooks/pre-commit .githooks/pre-merge-commit .githooks/pre-push .githooks/reference-transaction
```

Confirm it with:

```powershell
git config --local --get core.hooksPath
```

Do not configure this globally. Each clone must activate the repository-owned hooks once.

## Enforced checks

| Hook | Enforcement |
|---|---|
| `pre-commit` | Rejects commits on `main`, `develop`, detached HEAD, or a branch without an allowed prefix |
| `pre-merge-commit` | Rejects merge commits on `main`, `develop`, detached HEAD, or a branch without an allowed prefix |
| `pre-push` | Rejects updates to remote `main`/`develop` and rejects branch names without an allowed prefix |
| `reference-transaction` | Allows local main/develop only to fast-forward to the corresponding origin ref |

Allowed prefixes are `feature/`, `fix/`, `hotfix/`, `docs/`, `idea/`, `spike/`, `chore/`, and `release/`.

## Verification

Run `node scripts/test-branch-policy.mjs` to exercise these hooks in an isolated
temporary repository. CI runs the same checks. They cover:

- commits succeeded on an allowed branch;
- commits were rejected on `main`, detached HEAD, and a disallowed branch name;
- unreviewed updates to local main were rejected;
- fast-forward synchronization to origin/main succeeded;
- feature pushes succeeded and direct main/develop pushes were rejected.

The test remote is a local disposable bare repository; it does not contact GitHub.

## Limits

- Hooks validate Git operations; they do not prevent arbitrary working-tree edits. `AGENTS.md` instructs Codex to branch before writing.
- Local hook configuration can be changed by a user with repository access. Do not use `--no-verify` or change `core.hooksPath` to bypass policy.
- Server-side branch protection is still required for non-bypassable enforcement after a remote is approved and configured.
