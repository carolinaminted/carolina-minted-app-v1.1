# Carolina Minted Collectibles

React, TypeScript and Vite website for Carolina Minted Collectibles. Cloud Run
serves the compiled static site through Nginx.

- Production: https://cmc.carolinaminted.net
- [Local development and testing](docs/local-development.md)
- [Branching and release gates](docs/release-workflow.md)
- [Cloud Run deployment and rollback](docs/cloud-run.md)
- [First production release](docs/releases/2026-09-04.md)

## Quick start

Use Node.js 24 (verified locally with 24.20.0) and npm 11.

```sh
git config --local core.hooksPath .githooks
npm ci
npm run dev -- --host 127.0.0.1
```

Open http://localhost:3000. No API key or Google Cloud credentials are needed
locally. The contact form does not deliver messages. Images and fonts require
an internet connection.

Source belongs to this repository. In the CMC studio it is checked out at
`websites/carolina-minted-app-v1.1/`; the parent repository ignores this checkout.
Future websites receive separate repositories and entries in the studio index.
