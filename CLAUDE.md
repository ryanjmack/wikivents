# ts-vanilla

> This is a project shell. The rules below are baseline conventions. When starting a real project from this base, extend this file with project-specific context: architectural intent, key decisions, domain constraints, and known failure modes. Generic rules tell AI what to do. Project context tells it why, which is what enables good judgment.

## Rules

- Fix all errors and warnings. Never suppress with `@ts-ignore`, `eslint-disable`, or `!` assertions. If a fix requires a decision you can't make alone, ask the user.
- Pin exact dep versions (hermetic builds).
- `utils/` is pure functions only: no DOM, no side effects, testable in isolation.
- Co-locate tests: `foo.ts` and `foo.test.ts` in the same directory.
- Use CSS Modules for component styles. `globals.css` is for truly global rules only.
- `app/` is the shell. Wire things together there, put no logic there.

## Tooling

Conventions are enforced by the toolchain, not just documented here. TypeScript, ESLint, Stylelint, Prettier, and commitlint are configured strictly — the pipeline fails on violations. Treat config files as authoritative.

## Linting

After every edit, run `pnpm lint`. It runs tsc + eslint + stylelint + prettier in one shot. lint-staged runs on staged files pre-commit, the full pipeline runs pre-push.

## Git

Edit files in the working area only. Do not run `git add`, `git commit`, or touch the staging area. The user reviews, stages, and commits.

## Structure

```
src/
  app/       # app shell
  utils/     # pure functions + co-located tests
  styles/    # globals.css, variables.css
public/      # static assets
```

## Scripts

```
pnpm typecheck  # tsc --noEmit only, fast type-check without full lint
pnpm lint       # tsc + eslint (cached) + stylelint + prettier (authoritative)
pnpm format     # auto-format everything
pnpm test       # vitest run
```

See `package.json` for the full list.

## Debug log

`pnpm dev` writes dev server output to `vite.log`, cleared on each restart. Read it to diagnose runtime errors or HMR failures.

