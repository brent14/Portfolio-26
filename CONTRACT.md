# CONTRACT: Hover Blend Effect — Site-wide

> Created: 2026-04-14
> Status: IN PROGRESS

## GOAL
A grid of small colored circles renders as a fixed overlay across every page, activating and scaling on mouse proximity via `mix-blend-mode`, with a context-based config system that lets any page swap colors or params without becoming a client component.

## CONSTRAINTS
- `'use client'` only on the effect component and its provider — all pages stay as server components
- No new npm packages — pure DOM + rAF, same as the prototype
- `mix-blend-mode: multiply` as default; `blendMode` prop available in config for dark-palette variants
- Colors default to the portfolio's existing spot palette (`--color-spot-1` through `spot-5`)
- Must not interfere with existing `z-index` stack or pointer events on Nav, links, cards
- TypeScript strict — no `any`
- Follow project naming conventions (PascalCase components, camelCase hooks)

## FORMAT
- `dev/components/HoverBlendProvider.tsx` — context, `HoverBlendConfig` type, `DEFAULT_CONFIG`, `useHoverBlend` hook
- `dev/components/HoverBlend.tsx` — client component, reads context, owns the rAF loop and DOM grid
- `dev/components/HoverBlendVariant.tsx` — null-rendered client component pages drop in to override config for their route (resets on unmount)
- `dev/app/layout.tsx` — wrap body with `HoverBlendProvider`, render `<HoverBlend />` inside it

## AGENTS
- [Before commit] Visual verifier — screenshots home, resume, and work pages to confirm effect renders and doesn't block UI (blocking)

## FAILURE (any = not done)
- [ ] Pages need to become `'use client'` to set a variant
- [ ] Effect blocks clicks on nav, cards, or links
- [ ] Grid circles appear above nav or other `z-index`-critical UI
- [ ] Config change on page navigation doesn't take effect or doesn't reset on back-navigation
- [ ] TypeScript errors in any new file
- [ ] Effect visible on mobile/touch (should be mouse-only, gracefully idle on touch devices)
- [ ] Build fails
