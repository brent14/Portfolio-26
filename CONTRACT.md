# CONTRACT: Phase 2A — Design System

> Created: 2026-04-07
> Status: IN PROGRESS

## GOAL
A polished design system applied across all pages — two spot-color palette with mix-blend-mode overlays creating screen print depth, Sorts Mill Goudy + Average Sans typography, editorial work cards with color overlay, halftone/grain texture, and a cohesive visual language ready for Phase 2B animation.

## CONSTRAINTS
- Two palette variations built and togglable for review: (A) Cream + Red + Blue, (B) Cream/Gray + Chartreuse
- Color overlays via CSS mix-blend-mode: multiply — no extra image assets for color effects
- Halftone/grain texture via SVG filter or CSS — not raster images
- Sorts Mill Goudy for H1/H2 headlines — replaces Rubik
- Average Sans for body copy — replaces DM Sans
- IBM Plex Mono stays for labels, tags, monospace elements
- No changes to page structure or copy — design layer only
- No animation yet — that's 2B
- All 20 case study cards updated to editorial style
- prefers-reduced-motion respected on hover transitions
- TypeScript clean, build passes

## FORMAT
- app/globals.css — palette tokens, texture layer, font updates, palette B theme class
- app/layout.tsx — font swap (Sorts Mill Goudy + Average Sans)
- components/PaletteSwitcher.tsx — floating toggle for A/B comparison (dev tool)
- components/Nav.tsx — typography + spacing polish
- components/WorkCard.tsx — editorial redesign with color overlay on thumbnail
- components/FilterBar.tsx — styling pass
- components/Footer.tsx — styling pass
- app/page.tsx — section design pass
- app/work/[slug]/page.tsx — case study header + body layout polish
- app/resume/page.tsx — typography pass
- app/lab/page.tsx — card pass

## AGENTS
- [Before commit] Visual verifier — screenshots homepage, work grid, one case study (blocking)

## FAILURE (any = not done)
- [ ] Palette B not visually distinct from A
- [ ] Color overlays don't produce screen print layering effect
- [ ] Sorts Mill Goudy or Average Sans not loading
- [ ] Work cards still look like Phase 1 tiles
- [ ] Grain/texture not visible at normal zoom
- [ ] TypeScript errors
- [ ] Any page looks broken or unstyled
