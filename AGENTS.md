# Website working agreement

This independent product repository uses the owner-approved website workflow:
`feature/*`, `fix/*`, `hotfix/*`, `docs/*`, `chore/*`, `idea/*`, `spike/*`, or
`release/*` branches -> PR to `develop` -> release PR to `main` -> explicit
owner approval to promote a tested Cloud Run revision.

The parent studio's no-develop convention does not apply here. Keep
`core.hooksPath=.githooks`. No direct commits, merge commits or pushes to main or
develop; synchronize them from origin with fast-forward updates. Never bypass
hooks. Remote rules are the enforcement boundary; local hooks are safeguards.

Read docs/release-workflow.md and docs/cloud-run.md before release work. CI has no
cloud credentials. Merging a PR is not authorization to deploy. Preserve user
work, exclude credentials, run type checking/build/container smoke checks, and
report unverified gates. Workflow changes require owner review.
