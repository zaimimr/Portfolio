# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters, potential freelance clients and fellow developers evaluating Zaim Imran's work in a quick skim. Secondary: Zaim and invited admins using a hidden portal as the hub for side projects and their dashboards.

## Product Purpose

zaim.no is Zaim's personal portfolio: CV, projects and playground experiments, plus a private admin portal. Success = a visitor understands who Zaim is and what he builds within seconds, and Zaim can manage all content and reach every side project from one place.

## Positioning

A portfolio that is itself the proof of craft: hand-drawn personal identity (his own self-portrait as a recurring character), bold editorial execution, and an easter-egg economy no template can copy. Content is code (Val.build), versioned in git, no database.

## Operating Context

Hosted on Vercel from a single Next.js repo. Content edited through Val Studio at /val (git commits on publish). Admin at /admin, GitHub OAuth, allowlisted to Zaim and explicitly invited accounts. Projects carry dual taxonomy: category (work/freelance/hobby) and type (website/app/game/non-technical).

## Capabilities and Constraints

- No database, ever; Val.build content files are the only store.
- English only.
- Admin: link hub to side projects, Vercel analytics dashboard, Val draft/hidden-content preview.
- Contact form via Resend; CV self-hosted PDF.
- Site must scale to future surfaces (blog, more tools) without redesign.
- No code comments; self-documenting code; tokens over hardcoded values.

## Brand Commitments

- Name: Zaim Imran; domain zaim.no; wordmark "Z." signature.
- Design direction (user-approved): "Fet Strek" — bold editorial poster skeleton + hand-drawn ink layer + playful easter eggs. See DESIGN.md.
- Brand yellow #F4DE5D on dark charcoal; dark is the default identity.
- The hand-drawn SVG self-portrait (from previous site) evolves into a rigged recurring character.
- Easter egg canon: the old site's "Light mode coming soon" promise is kept — clicking the avatar's screen enables light mode.

## Evidence on Hand

- Old project descriptions recoverable from git history (`git show 38dcf8c^:src/projects.json`) as reference only; user chose to author all content fresh in Val.
- Original avatar SVG on master branch at components/Avatar.tsx.
- No testimonials, metrics or press; never fabricate any.

## Product Principles

- Personality is the differentiator; professionalism is the floor (whimsy recedes on case studies and admin).
- Every visitor path works without hover, motion or JS tricks; delight is additive, never load-bearing.
- Content lives in Val; components never hardcode copy.
- Admin is a tool, not a stage: dense, calm, fast.
- Ship stable versions only; the stack is newest-but-released.
