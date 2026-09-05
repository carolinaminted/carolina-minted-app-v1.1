# Local development and testing

Owner: Carolina Minted. Updated: 2026-09-04.

Install Git, Node.js 24 and npm 11. `.nvmrc` records the verified Node version.
In this Windows workspace the portable Node installation is outside the repo:

```powershell
$env:Path = 'C:\repos\.local-tools\node-v24.20.0-win-x64;' + $env:Path
Set-Location C:\repos\cmc-codex\websites\carolina-minted-app-v1.1
node --version
npm.cmd --version
git config --local core.hooksPath .githooks
npm.cmd ci
npm.cmd run dev -- --host 127.0.0.1
```

Open http://localhost:3000. Stop with Ctrl+C. On another machine, install Node
normally and omit the portable PATH line. No `.env` file or Gemini key is needed.

Before a PR:

```powershell
npx.cmd --no-install tsc --noEmit
node scripts/test-branch-policy.mjs
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4173
```

Open http://localhost:4173 to inspect the production bundle. Vite preview does
not reproduce Nginx health/cache behavior. With Docker installed:

```powershell
docker build -t cmc-local .
docker run --rm -d --name cmc-local -p 127.0.0.1:8080:8080 -e PORT=8080 cmc-local
node scripts/smoke-test.mjs http://127.0.0.1:8080
docker stop cmc-local
```

CI checks `/health`, HTML, JS/CSS assets, cache headers, missing-asset 404s and SPA
fallback. Docker is not installed on the original Windows workspace; GitHub's
Linux runner performs that check.

## Manual acceptance checklist

- Home, Community, About and Contact navigation works; logo returns home.
- Hero and collection images load; external destinations are correct.
- Check 390px mobile and desktop widths for overflow and readable text.
- Keyboard focus is visible; menu/buttons work without a mouse.
- No application errors in the browser console.
- Contact submit sends nothing. Do not describe it as operational.
- Community content is static; there is no checkout, inventory or CMS backend.

Content lives in `en.json`, the new homepage in `collector-home.tsx` and
`collector-home.css`, and shared/original sections in `index.tsx`. External image
and font availability needs browser verification in addition to CI.
