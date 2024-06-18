# Linting and Formatting

## Requirements

- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (extension id: `dbaeumer.vscode-eslint`)

  - Eslint must be installed as an extension for local linting to work within VS Code on save.
  - Eslint is installed in app dependencies. If not using VS Code, linting the project may be done by calling:

    ```sh
    yarn lint
    ```

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (extension id: `esbenp.prettier-vscode`)

  - Prettier must be installed as an extension for local formatting to work within VS Code on save.
  - Prettier is installed in app dependencies. If not using VS Code, formatting the project may be done by calling:

    ```sh
    yarn format
    ```

- [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) (extension id: `DavidAnson.vscode-markdownlint`)

  - Markdownlint must be installed as an extension for local documentation formatting to work within VS Code.

## Configuration

Eslint uses [`./.eslintrc.js`](./.eslintrc.js) and [`./.eslintignore`](./.eslintignore) for configuration.

Prettier uses [`./.prettierrc.js`](./.prettierrc.js) and [`./.prettierignore`](./.prettierignore) for configuration.

### Documentation Linting

Use the [`markdownlint` vscode extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint).

Or run in directly using [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2).
This can be install via `asdf` as well: <https://github.com/paulo-ferraz-oliveira/asdf-markdownlint-cli2>

```sh
markdownlint-cli2 "**/*.md" "#**/node_modules/**"
```

The [`.markdownlint.json`](./.markdownlint.json) file is used to configure the markdown linting rules.
