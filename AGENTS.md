# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the React single-page app (routing logic in `App.jsx`, styles in `App.css`/`index.css`).
- `docs/` stores the production bundle published to GitHub Pages and Netlify; never hand-edit except via `npm run build`.
- `public/` holds static assets copied during build (e.g., `contact-success.html`, favicon, hero image).
- Tests live beside code (`src/App.test.jsx`) and share utilities defined in `vitest.setup.js`.
- Automation lives under `scripts/` and `.github/workflows/` (CI pipeline).

## Build, Test, and Development Commands
- `npm install` — install dependencies.
- `npm run dev` — start the Vite dev server with hot reload.
- `npm run test` — run Vitest suite (routing, form detection).
- `npm run build` — produce the site into `docs/` and run the docs integrity script.
- `npm run lint` — check ESLint rules before committing.

## Coding Style & Naming Conventions
- Use modern React with function components and hooks; no class components.
- Prefer descriptive camelCase for variables/functions, PascalCase for components.
- Stick to Tailwind utility classes for layout/typography; add minimal custom CSS in `App.css`.
- Keep JSX readable: break long props onto new lines and favor semantic HTML.

## Testing Guidelines
- Vitest + Testing Library (jsdom) power unit tests. Add new suites in `src/*.test.jsx`.
- Name tests as `ComponentName.test.jsx` and keep assertions focused on visible behavior.
- Run `npm run test` (or `npm run test:watch`) locally before pushing.

## Commit & Pull Request Guidelines
- Follow existing commit styles (`feat:`, `fix:`, `chore:`, `docs:`). Limit scope to a single change set.
- Include generated `docs/` changes when edits affect UI/content.
- Pull requests should describe user-facing changes, note any Netlify/CI considerations, and include screenshots or links when visual sections change.

## Deployment & Config Tips
- Always rebuild (`npm run build`) before pushing to ensure Netlify/GitHub Pages stay in sync.
- Netlify forms rely on the hidden form in `index.html`; avoid removing the honeypot fields or `contact-success.html`.

## WYSIWID Agent Workflow
- Before coding, load `WYSIWID/context.yaml` to understand current concept state; treat it as the single source of project memory.
- Follow the reasoning loop in `WYSIWID/pseudocode_reasoning_system.yaml` (Plan → Execute → Answer) and enforce Concept/Synchronization rules from `WYSIWID/CODING-PHILOSOPHY.md`.
- When defining new architectural pieces, copy templates from `WYSIWID/templates/concept/` and run `python WYSIWID/scripts/validate_architecture.py` to confirm compliance.
- Update `WYSIWID/context.yaml` with any new decisions before finishing, and keep `QUALITY-STANDARDS.md` checklists in mind for security/performance.
