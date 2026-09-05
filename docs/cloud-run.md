# Cloud Run deployment and rollback

Owner: Carolina Minted. Updated: 2026-09-04.

Production service: `carolina-minted-collectibles`, region `us-west1`.
Custom domain: https://cmc.carolinaminted.net. Keep the existing domain mapping.
The owner selects the existing Google Cloud project; never infer it from the
active CLI default. No secrets or service-account keys belong in this repo.

## Prerequisites and release source

Use authenticated Google Cloud CLI, Git, Node 24/npm 11. Source deployment runs a
billable Cloud Build and stores an image in Artifact Registry. Existing service
settings must be reviewed before deploying: port 8080, 1 CPU, 512 MiB, minimum 0,
maximum 3, concurrency 80, timeout 300 seconds were the first-release settings.
Confirm current configuration rather than resetting it to these historical values.

PowerShell setup (use your installed gcloud location on other machines):

```powershell
$cmcGcloud = 'C:/repos/.local-tools/google-cloud-sdk/bin/gcloud.cmd'
& $cmcGcloud auth login
$cmcProject = Read-Host 'Existing Google Cloud project ID'
if ([string]::IsNullOrWhiteSpace($cmcProject)) { throw 'Project is required' }
$cmcService = 'carolina-minted-collectibles'
$cmcRegion = 'us-west1'
git fetch origin
if ($LASTEXITCODE -ne 0) { throw 'Fetch failed' }
if ((git branch --show-current) -ne 'develop') { throw 'Use develop for a preview' }
if (git status --porcelain) { throw 'Commit or preserve changes before releasing' }
$cmcCommit = (git rev-parse HEAD).Trim()
if ($cmcCommit -ne (git rev-parse origin/develop).Trim()) { throw 'Develop is not synchronized' }
npm.cmd ci
if ($LASTEXITCODE -ne 0) { throw 'Install failed' }
npx.cmd --no-install tsc --noEmit
if ($LASTEXITCODE -ne 0) { throw 'Type check failed' }
npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw 'Build failed' }
& $cmcGcloud run services describe $cmcService --project $cmcProject --region $cmcRegion --format='yaml(status.traffic)'
```

Save the current traffic revision as the rollback target. Review CI for the exact
commit. Check `.gcloudignore` and `.dockerignore` whenever a build input changes.
Use an archive of the commit so untracked/local files cannot enter the upload:

```powershell
$cmcArchive = Join-Path $env:TEMP "cmc-$cmcCommit.zip"
$cmcSource = Join-Path $env:TEMP "cmc-source-$cmcCommit"
if ((Test-Path $cmcArchive) -or (Test-Path $cmcSource)) { throw 'Use a fresh staging path' }
git archive --format=zip --output=$cmcArchive $cmcCommit
if ($LASTEXITCODE -ne 0) { throw 'Archive failed' }
Expand-Archive -LiteralPath $cmcArchive -DestinationPath $cmcSource
```

## Preview: no production traffic

After approval to create the cloud preview:

```powershell
& $cmcGcloud run deploy $cmcService --project $cmcProject --region $cmcRegion --source $cmcSource --port 8080 --no-traffic --tag release-preview --labels "source-commit=$cmcCommit"
if ($LASTEXITCODE -ne 0) { throw 'Deployment failed; inspect cloud build/startup logs' }
& $cmcGcloud run services describe $cmcService --project $cmcProject --region $cmcRegion --format='yaml(status.latestCreatedRevisionName,status.traffic)'
$cmcTestedRevision = Read-Host 'Exact newly created revision name'
& $cmcGcloud run revisions describe $cmcTestedRevision --project $cmcProject --region $cmcRegion --format='yaml(metadata.labels,status.imageDigest,status.conditions)'
$cmcPreviewUrl = Read-Host 'Tagged preview URL from traffic output'
node scripts/smoke-test.mjs $cmcPreviewUrl
if ($LASTEXITCODE -ne 0) { throw 'Preview smoke test failed' }
```

Record source label, immutable image digest, revision and build ID. Confirm the
previous revision still has 100% of production traffic. A tag on this public
service is publicly accessible even with zero production traffic. Test navigation,
images, desktop/mobile layout and browser errors. Use `/health`, not the reserved
`/healthz` route. The form is not a working message-delivery service.

## Promotion

After the green develop -> main PR is merged and the owner approves this exact
preview, preserve the variables above and record the current rollback revision:

```powershell
git fetch origin
if ($LASTEXITCODE -ne 0) { throw 'Fetch failed' }
git merge-base --is-ancestor $cmcCommit origin/main
if ($LASTEXITCODE -ne 0) { throw 'Preview source is not included in main' }
$cmcRollbackRevision = Read-Host 'Verified current production revision for rollback'
if ([string]::IsNullOrWhiteSpace($cmcRollbackRevision)) { throw 'Rollback target required' }
# Verify the saved revision still has the recorded image digest/source label.
& $cmcGcloud run revisions describe $cmcTestedRevision --project $cmcProject --region $cmcRegion --format='yaml(metadata.labels,status.imageDigest,status.conditions)'
if ((Read-Host "Type PROMOTE after owner approval for $cmcTestedRevision") -cne 'PROMOTE') { throw 'Promotion cancelled' }
& $cmcGcloud run services update-traffic $cmcService --project $cmcProject --region $cmcRegion --to-revisions "${cmcTestedRevision}=100"
if ($LASTEXITCODE -ne 0) { throw 'Traffic update failed; inspect current traffic' }
node scripts/smoke-test.mjs https://cmc.carolinaminted.net
if ($LASTEXITCODE -ne 0) { throw 'Production smoke test failed: follow rollback procedure' }
& $cmcGcloud run services describe $cmcService --project $cmcProject --region $cmcRegion --format='yaml(status.traffic)'
```

Check the Cloud Run service URL too. Observe requests and startup/application
errors for at least 15 minutes after promotion. Record actual start/end times;
a 15-minute log lookback immediately after promotion is not that observation.

On blank/unavailable pages, critical asset failure or broken essential navigation,
use the rollback authority included in owner approval:

```powershell
& $cmcGcloud run services update-traffic $cmcService --project $cmcProject --region $cmcRegion --to-revisions "${cmcRollbackRevision}=100"
if ($LASTEXITCODE -ne 0) { throw 'Rollback failed; inspect service immediately' }
```

Recheck the domain and relevant behavior. The original AI Studio rollback revision
does not provide the new `/health` endpoint, so use browser/HTTP checks appropriate
to that version. Retain prior revisions and image digests. Update a release record
under `docs/releases/` and create an annotated release tag only for the recorded
source commit after verifying production.

Sources, accessed 2026-09-04: [Google source deployment](https://docs.cloud.google.com/run/docs/deploying-source-code),
[traffic and rollback](https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration).
