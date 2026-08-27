# zaim.no

Personal portfolio: CV, projects and playground experiments, plus a hidden admin portal. Content is code — no database.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict
- Tailwind CSS v4, all design tokens in `src/app/globals.css` under `@theme`
- Motion for animation, presets in `src/lib/motion.ts`
- Val.build CMS: content lives in `src/content/*.val.ts`, edited visually at `/val`, published as git commits
- Auth.js (GitHub OAuth, single-account allowlist) guarding `/admin`
- Resend for the contact form, Vercel for hosting and analytics

## Development

```sh
pnpm install
pnpm dev
```

- Site: http://localhost:3000
- Val Studio: http://localhost:3000/val
- Component gallery (dev only): http://localhost:3000/styleguide

Checks: `pnpm typecheck`, `pnpm lint`, `pnpm validate` (Val content), `pnpm build`.

## Content

Every piece of copy, every project and every admin link is a Val module in `src/content/`. Edit in the studio at `/val` or directly in the files. New modules must be registered in `val.modules.ts`. Projects carry two taxonomies: category (work/freelance/hobby) and type (website/app/game/non-technical), defined once in `src/config/taxonomy.ts`. Projects with `hidden: true` are only visible in the admin portal.

## Environment

Copy `.env.example` to `.env.local`. The build requires no secrets; features degrade gracefully:

- `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `ADMIN_GITHUB_LOGIN` — admin sign-in
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL` — contact form (falls back to mailto without them)
- `VERCEL_API_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID` — admin analytics dashboard
- `VAL_API_KEY`, `VAL_SECRET` — Val remote mode (editing content in production)

## Design

The design system is called "Fet Strek" — see `DESIGN.md` and `PRODUCT.md`. Rules that matter when contributing: consume tokens, never raw values; yellow is never text on light backgrounds; every animation needs a reduced-motion fallback; the admin portal stays calm.
