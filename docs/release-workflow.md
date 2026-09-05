# Branching and release gates

Owner: Carolina Minted. Updated: 2026-09-04.

```text
feature/* or fix/* -> PR -> develop -> release PR -> main
                            |                       |
                      tested cloud preview     owner approval
                                                    |
                                          promote exact revision
```

`develop` is the integration branch. `main` records approved releases. Changes
start from develop; hotfixes also return through develop so fixes are not lost.
This website policy is separate from the private studio's branch convention.

```sh
git fetch origin
git switch develop
git pull --ff-only origin develop
git switch -c feature/describe-change
# edit, test, commit
git push -u origin feature/describe-change
```

Use GitHub PRs for all merges. Use **merge commits** for develop -> main so the
tested develop commit remains in main's history. Do not delete develop after a
release. Keep the integration branch current with main through a synchronization
PR when needed. Local hooks block direct commits/pushes to either long-lived
branch, and allow only fast-forward synchronization to their origin refs.

## GitHub configuration

Create an active branch ruleset targeting `main` and `develop`:

- Require a pull request before merging.
- Require checks `validate`, `container-smoke`, and `release-source`.
- Require branches to be up to date before merging and conversations resolved.
- Block force pushes and deletions; leave bypass actors empty.
- Use zero required peer approvals while the owner is the only contributor;
  self-approval cannot satisfy a peer-review requirement. Owner preview approval
  remains mandatory before production. Set one peer approval when a second
  maintainer is available.

CI's release-source check rejects main PRs from any branch except this repository's
develop. CI builds the site and tests the actual Docker image, with read-only
repository permissions and no Google Cloud credentials. Required checks and PR
rules must be active remotely to enforce this policy; hooks alone are insufficient.

## Release checklist

1. Merge a green PR into develop. Build a preview from its clean, recorded commit.
2. Complete the [local/manual checklist](local-development.md) against the preview.
3. Record commit, revision, image digest, preview URL and current rollback target.
4. Open develop -> main release PR with those results. Wait for all required checks.
5. Merge with a merge commit. Confirm the tested commit is an ancestor of main.
6. Obtain explicit owner approval, including rollback authority; follow
   [Cloud Run promotion](cloud-run.md). Never rebuild between preview and promotion.
7. Record the resulting traffic, custom-domain checks, observation interval and tag.

Branch rules govern source changes. They do not restrict a person already holding
Cloud Run deployment privileges. Production promotion is an owner-operated process,
not an automated IAM-enforced GitHub deployment gate. Moving deployment into
GitHub would require a separately reviewed identity/permissions design.

## Maintenance and evidence

Review action/runtime versions and lockfile changes through normal PRs. CI adds no
application dependencies. Keep check names stable because the ruleset refers to
them. Build images use moving Node/Nginx tags; deployed image digests, rather than
a rebuild of an old tag, are the rollback authority.

GitHub documentation, accessed 2026-09-04:
[protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).
