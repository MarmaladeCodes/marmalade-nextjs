# Marmalade Front End Nextjs for Headless Wordpress

This Nextjs starter is intended to be used with a Headless Wordpress backend. Find a starter repo here: <https://github.com/jonryser/headless-wordpress>.

## Requirements

1. [Node](https://nodejs.org/en/) version (see [.tool-versions](./.tool-versions))

   - This project is setup to use [asdf](https://github.com/asdf-vm/asdf).
     This allows installing a specific version for the project.
     To install nodejs with asdf, see [https://github.com/asdf-vm/asdf-nodejs](https://github.com/asdf-vm/asdf-nodejs)

   - If using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to set a compatible version based on the project [.nvmrc](./.nvmrc)

2. Yarn (for package management) version (see [.tool-versions](./.tool-versions))

   - This project is setup to use [asdf](https://github.com/asdf-vm/asdf).
     This allows installing a specific version for the project.
     To install yarn with asdf, see [https://github.com/twuni/asdf-yarn](https://github.com/twuni/asdf-yarn)

   - Or install globally via npm: `npm i -g yarn`

   - Or install globally via Homebrew: `brew install yarn`

   - The correct version of yarn has been committed to this repo (in [.yarn](./.yarn/releases)).
     As long as node is installed and a version of yarn is available on the system, this should "just work" and use the project version.
     If there are any issues, or the version needs to be updated, follow the steps below.

   - Set the version for the project ie: `yarn set version 3.5.1`

## Local Development

1. Clone this repo

1. Copy the `.env.local.example` file to `.env.local` and fill in the values.

1. Run `yarn install` to install dependencies

1. Run `yarn dev` to start the development server

## Linting and Formatting

For linting and formatting see [`LINTING.md`](./LINTING.md).

## Testing

For info on unit testing, see [./**tests**/TESTING.md](./__tests__/TESTING.md).
