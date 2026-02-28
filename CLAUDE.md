# wikivents

Real-time ops console for the Wikimedia SSE firehose. Vanilla TypeScript, no framework. Perf-first — proves bounded memory and bounded work per frame under bursty input.

Stream: `https://stream.wikimedia.org/v2/stream/recentchange`

## Rules

- Fix all errors and warnings. Never suppress with `@ts-ignore`, `eslint-disable`, or `!` assertions. If a fix requires a decision you can't make alone, ask the user.
- Pin exact dep versions.
- Co-locate tests: `foo.ts` and `foo.test.ts` in the same directory.
- After every edit, run `pnpm fix`. Runs all formatters and type-checks.

## Git

Edit files in the working area only. Do not run `git add`, `git commit`, or touch the staging area. The user reviews, stages, and commits.

## Architecture

```
SSE → queue → flush loop → ring buffer → render
```

**Core constraint: ingest rate ≠ render rate.** Never do per-event DOM updates.

Three loops: ingest (every message), flush (batched cadence), render (rate-limited).

## Tooling

- Conventions are enforced by the toolchain. TypeScript, ESLint, Stylelint, Prettier, and commitlint are configured strictly.
- Config files are authoritative.
- Use CSS Modules for component styles.

## Scripts

```
pnpm build          # production build
pnpm dev            # start dev server (output logged to vite.log)
pnpm fix            # run all formatters and type-check - run after every edit
pnpm lint           # read-only verify: tsc, eslint, stylelint, prettier (CI/hooks)
pnpm prettier       # prettier --write
pnpm prettier:check # prettier --check
pnpm preview        # serve production build locally
pnpm test           # vitest run
pnpm test:watch     # vitest watch mode
pnpm typecheck      # tsc --noEmit only
```

## Local files

`PLAN.md` — architecture details, key decisions, milestones.
`TODO.md` — current goals and active work.

## Debug log

`pnpm dev` writes dev server output to `vite.log`, cleared on each restart. Read it to diagnose runtime errors or HMR failures.

## CI/CD

- lint-staged runs on staged files pre-commit, full pipeline runs pre-push.
