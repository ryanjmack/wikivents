# wikivents

real-time console for the wikimedia edit stream

## Getting started

```
git clone https://github.com/ryanjmack/wikivents
cd wikivents
pnpm install
pnpm dev
```

Node and pnpm versions are pinned. I recommend [fnm](https://github.com/Schniz/fnm) and [corepack](https://nodejs.org/api/corepack.html).

## Usage

```
pnpm dev           start dev server (output logged to vite.log, cleared on restart)
pnpm build         production build with sourcemaps
pnpm preview       serve the production build locally

pnpm fix           run all formatters and type-check
pnpm lint          read-only: tsc, eslint, stylelint, prettier
pnpm typecheck     type-check

pnpm test          run tests once
pnpm test:watch    run tests in watch mode
```

## Stack

- **TypeScript**: `@tsconfig/strictest`
- **Vite**: fast dev server, native ESM, fast builds
- **Vitest**: shares Vite's module graph, no env drift
- **CSS Modules**: scoped styles per file
- **LightningCSS**: native Vite CSS transformer, automatic vendor prefixes, CSS nesting
- **modern-css-reset**: clean baseline
- **ESLint + Prettier + Stylelint**: enforced code and style consistency
- **Husky + lint-staged + commitlint**: clean commits, enforced conventions, no CI surprises

## CI/CD

GitHub Actions runs on every push and PR to `main`:

```
lint -> test -> build
```

Output is a static `dist/` folder, deploy anywhere that serves static files.

## Credits

- [Modus Themes](https://protesilaos.com/emacs/modus-themes) by Protesilaos Stavrou — GPL-3.0-or-later
