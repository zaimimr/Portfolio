# Design: "Fet Strek"

User-approved direction (2026-08-26 planning session): bold marker poster + ink mischief. Full spec: ~/.claude/plans/merry-cooking-llama-agent-adesign-planner-484334dc4111a19a.md — that file is authoritative for token values, component inventory and UX patterns; this file is the in-repo summary.

## Concept
Editorial poster skeleton (oversized Bricolage Grotesque display type, asymmetric 12-col grid, hard offset shadows, full-bleed yellow breaks) with a hand-drawn ink layer on top (squiggle underlines, wobble-radius borders, margin doodles in Shantell Sans, the self-portrait avatar as recurring character). Playfulness = micro-interactions with spring physics + discoverable easter eggs. Yellow-marker text highlight is the signature move. One hero-only self-draw moment on first visit (sessionStorage-gated). No sound.

## Illustrated world: "Ukjent terreng" (home page)
The front page sits inside a hand-drawn alien landscape the visitor descends into as they scroll. Added 2026-08-27 as a layer on top of "Fet Strek", not a replacement: the poster type, marker highlight, wobble borders and offset shadows are unchanged.

- Geometry is generated, not hand-typed: a seeded generator emits `src/components/site/terrain/terrain-art.ts` (crests, slabs, spires, seated rocks, chasms, trunks, trail samples). Regenerate rather than editing path data by hand.
- Four depth planes: a fixed `backdrop` (moon, dust, far ridges) plus three parallax layers (`mid` 0.31, `terrain` 0.62, `near` 1.04). `near` is desktop-only.
- Tiling is seamless by construction: each layer has one `head` band carrying the horizon silhouette, then `body` bands that are edge-uniform (full-bleed base tone) with all features contained inside. Never give a body band a top or bottom edge that differs in tone, or the tile seam becomes a visible stripe.
- Depth reads from six tones (`--scene-t0`..`t5`, mixed from `--scene-haze` toward `--scene-deep`) plus rim-lit crest edges, fixed haze bands between planes, and fog-gradient chasms. Both themes derive from the same two anchors, so light theme becomes warm mist on paper.
- Scale crops, it does not shrink: `unit = max(vw/1600, vh/1000)` sizes every layer, so a phone gets a cropped close-up rather than a miniature wide shot.
- The explorer is Zaim as a recurring character (teal jacket, dark hair, lantern in `--scene-glow`). It sits at a fixed screen height, follows the terrain band's trail samples horizontally, and its legs and lantern arm swing off `--swing`/`--lift` CSS vars written by the scroll loop, so nothing re-renders per frame.
- Legibility is measured, not assumed: hero text sits on breakpoint-specific scrims (vertical wash below `md`, two radial pools above) tuned so the brightest/darkest pixel behind body copy holds >= 4.5:1 in both themes.
- Reduced motion freezes every plane and the explorer at their scroll-zero position; the hero signature stroke self-draws once per session (`sessionStorage`, CSS-driven) and otherwise renders final state.

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
