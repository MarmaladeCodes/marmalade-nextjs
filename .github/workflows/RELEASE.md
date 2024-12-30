# Release Workflow Documentation

This workflow automatically creates releases and changelogs when code is pushed to the `develop` or `main` branches.

## Workflow Triggers

- Push to `develop` branch (creates dev release)
- Push to `main` branch (creates production release)
- Manual trigger via GitHub Actions UI

## Environment Setup

### GitHub Environments

Two environments are configured in GitHub repository settings:

- `dev` (for develop branch)
- `prod` (for main branch)

## Release Process

1. Info Gathering

   - Determines environment (`dev`/`prod`) based on branch
   - Extracts version from [`package.json`](../package.json)
   - Creates version tag:
     - Dev: `{version}.develop` (e.g., "1.2.3.develop")
     - Prod: `{version}` (e.g., "1.2.3")

1. Release Creation

   - Creates git tag if it doesn't exist
   - Generates changelog from commits since last release
   - Creates GitHub release with:
     - Dev: marked as pre-release
     - Prod: marked as latest release

## Version Tagging

- Dev releases: `{version}.develop`
- Prod releases: `{version}`

Example:

| `package.json` version | Dev tag         | Prod tag |
| ---------------------- | --------------- | -------- |
| "1.2.3"                | "1.2.3.develop" | "1.2.3"  |

## Error Handling

- Skips if tag already exists
- Removes created tag on workflow failure
- Times out after 1 minute for info gathering

## Manual Release

To trigger manually:

_Note: The workflow will fail if the tag already exists._

1. Go to Actions tab
1. Select "Create Release" workflow
1. Click "Run workflow"
1. Select branch to release from

## Changelog Generation

The workflow automatically generates a changelog from commits between releases using the [changelog-action](https://github.com/requarks/changelog-action).
All commit types are included in the changelog.
