# Contribute

## Requirements

### Step 1: install Node.js v20

Since the project uses the latest Node LTS version, install Node.js v20.
If you need to handle multiple Node version for multiple projects, we suggest to use [nvm](https://github.com/nvm-sh/nvm#install--update-script) on MacOS/Linux
or [nvm-windows](https://github.com/coreybutler/nvm-windows#readme) on Windows.

Ensure that you are running Node.js 18:

```shell
node -v  # v18.x
```

### Step 2

## Workspace setup

1. Install the dependencies with `npm install`
2. Start the development server using `npm install dev`
3. Browse the application on [http://localhost:3000](http://localhost:3000)

## Testing

Learn how to test the application in [TESTING.md](./TESTING.md) file.

## Git configuration and conventions

### Commit signature

We enforced the commit signatures for contributors.
If you do not sign your commits, you might be unable to merge your work into the main branch.
[Learn how to sign commits using GPG](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits)
.

### Commit Rules

- Commit messages must be in English
- Commit messages must be descriptive and helpful
- Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification

## Branch flow

We are using a two branches workflow, where:

- `main` is the production branch, which means that any commit on main is deployed to production
- `dev` as day-to-day upstream

Consequently:

- Contributor branches must start from `dev` and target `dev` branch
- When we want to deploy to production, we will create a pull request from `dev` to `main`

## Continuous integration

### Linting and formatting

We use [ESLint](https://eslint.org/) for our JavaScript/TypeScript project and [Prettier](https://prettier.io/) as
default formatter.

- The [ESLint](https://eslint.org/docs/latest/) configuration can be found in [`.eslintrc.cjs`](.eslintrc.cjs).
- The [Prettier](https://prettier.io/docs/en/index.html) configuration is located at the root [`.prettierrc.cjs`](.prettierrc.cjs) file.

### Unused imports

We use [unimported](https://github.com/antfu/unimported) to check for unused imports.

To check for unused imports, run `npm run unimported:check`.

### Release

Learn how to release a new version of the application in [RELEASE.md](./RELEASE.md) file.
