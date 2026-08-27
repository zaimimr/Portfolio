# Design: "Fet Strek"

User-approved direction (2026-08-26 planning session): bold marker poster + ink mischief. Full spec: ~/.claude/plans/merry-cooking-llama-agent-adesign-planner-484334dc4111a19a.md — that file is authoritative for token values, component inventory and UX patterns; this file is the in-repo summary.

## Concept
Editorial poster skeleton (oversized Bricolage Grotesque display type, asymmetric 12-col grid, hard offset shadows, full-bleed yellow breaks) with a hand-drawn ink layer on top (squiggle underlines, wobble-radius borders, margin doodles in Shantell Sans, the self-portrait avatar as recurring character). Playfulness = micro-interactions with spring physics + discoverable easter eggs. Yellow-marker text highlight is the signature move. One hero-only self-draw moment on first visit (sessionStorage-gated). No sound.

## Non-negotiables
- Dark theme default (#1B222A bg); light theme (#FAF7F0 warm paper) unlocked via avatar-screen easter egg AND a conventional nav toggle.
- Yellow #F4DE5D is never text on light backgrounds; use --color-accent-strong (#8A6D00) there.
- Category colors: work #9CC6F5, freelance #F7A8C4, hobby #A8E6B8; type tags stay neutral outlines. Color encodes exactly one dimension.
- Fonts: Bricolage Grotesque (display), Schibsted Grotesk (body), Shantell Sans (hand, decorative only, min 16px), JetBrains Mono.
- All tokens live in src/app/globals.css @theme; components consume tokens, never raw values.
- Motion via motion.dev with presets from src/lib/motion.ts only (spring.snappy/gentle/bouncy); root MotionConfig reducedMotion="user"; every animation has a reduced-motion fallback (final state, crossfade, or instant swap).
- Doodles/cursor effects only >= md and pointer-fine; aria-hidden when decorative; no hover-only content.
- Admin portal dials personality to ~15%: standard radii, no wobble/doodles, denser, mono-forward. The 401 screen is the one allowed joke.

## Voice
Short, warm, a little cheeky. Hand font carries the easter-egg voice ("It finally happened."). Norwegian flavor allowed in decorative doodles, English for all essential copy.
