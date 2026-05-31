# Codex Repo Guide

Quick orientation notes for future Codex work in this repository.

## Project Shape

- Portfolio/resume website for Vladyslav Bondarchuk.
- Stack: Next.js 14 app router, React 18, TypeScript, Tailwind CSS, date-fns.
- Main routes live under `app/(root)`:
  - `/` -> `app/(root)/(home)`
  - `/experience` -> `app/(root)/experience`
  - `/projects` -> `app/(root)/projects`
  - `/skills` -> `app/(root)/skills`
  - `/contact` -> `app/(root)/contact`
- Shared shell:
  - `app/layout.tsx` wraps the app with `Providers`.
  - `app/(root)/layout.tsx` renders `BackgroundMusic`, `Aside`, `CC_BY`, `Header`, then page content.
  - `components/default-layout.tsx` is the common page content wrapper.

## Commands

- Install: lockfiles for both npm and pnpm exist. Prefer the package manager the user is using in the current task.
- Dev: `npm run dev` or equivalent runs `next dev -H 0.0.0.0 -p 3000`.
- Build: `npm run build`.
- Lint: `npm run lint`.
- Format check: `npm run format`.
- Format fix: `npm run format:fix`.

## Data And Content

- Resume/page copy is mostly centralized in `locales/index.ts`, including summary, experience, skills, projects, and contacts.
- Navigation route constants are in `types/enums.ts`.
- Header link list and CV URL are in `constants/index.ts`.
- Experience date formatting and computed total experience use `lib/utils/parsedAndFormateDate.ts`.
- Home page injects computed experience into HTML copy by replacing `<span id="exp"></span>`.
- Several strings are parsed as HTML through `html-react-parser`; be careful with copy changes and only allow trusted local content.

## State

- Language state:
  - `contexts/language-context.tsx`
  - default is `en`
  - persisted in `localStorage` under `language`
  - toggles between `en` and `ua`
- Music state:
  - `contexts/play-music-context.tsx`
  - toggled from header settings
  - `components/background-music.tsx` controls `/assets/music/bg-song.weba`

## Styling And Assets

- Global Tailwind entry: `app/globals.css`.
- Main custom styles: `styles/theme.css`.
- Animations: `styles/animation.css`.
- Tailwind theme extensions: `tailwind.config.ts`.
- Public assets:
  - icons: `public/assets/icons`
  - images: `public/assets/images`
  - gifs: `public/assets/gifs`
  - music: `public/assets/music`
- Visual style is a dark cyber/neon layout with red, cyan, yellow accents and animated borders/backgrounds.
- Desktop uses a two-column root layout with `Aside`; mobile hides the aside and uses background classes in the content wrapper.

## Known Risks / Watch Items

- Ukrainian text and some symbols in `README.md`, `locales/index.ts`, and related rendered strings appear mojibaked. Do not mass-fix encoding unless the user asks, because it can touch a lot of content.
- There are typos in existing names and CSS that may be intentional or just legacy:
  - `parsedAndFormateDate`
  - `lib/utils/utlis.ts`
  - `LanguageEnum.UKRAINE`
  - CSS keyframes use `transalteX` in `slide-from-right`
- `Header` imports `clearTimeout` from `timers`; in client code, browser globals usually suffice. Touch only if working on that area.
- `projects` slider uses direct DOM/scroll reads and may be sensitive to layout changes.
- The repo has no obvious test suite beyond lint/build scripts.

## Change Guidelines

- For content updates, start in `locales/index.ts` and keep both `en` and `ua` in sync when possible.
- For new routes, add enum values in `types/enums.ts`, link entries in `constants/index.ts`, labels in `locales/index.ts`, and route folders under `app/(root)`.
- For visual edits, prefer existing utility classes and custom classes in `styles/theme.css` before adding new patterns.
- Keep changes localized; this repo is mostly static UI and content, so broad abstractions are rarely needed.
- Verify with at least `npm run lint` or `npm run build` when code changes. For docs-only edits, checking the file exists and reading it back is enough.
