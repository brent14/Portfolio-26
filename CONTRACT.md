# CONTRACT: Hero — HSV-Masked Fluid Reveal

> Created: 2026-04-24
> Status: IN PROGRESS
> Supersedes: Albers Hero — Phase 1 (abandoned)

## GOAL
The homepage hero displays `brent_1.mp4` full-bleed by default; mouse movement drives two independent fluid simulations that reveal `brent_2.mp4` (wide/slow) and a matrix-rain canvas (tight/fast) beneath it, with the matrix-rain reveal HSV-masked so it never bleeds through orange regions of `brent_2.mp4`. On mobile or `prefers-reduced-motion`, a single `object-contain` video fallback replaces the effect.

## CONSTRAINTS
- Vanilla Three.js (no R3F for this component) — reuse the existing `three` dep, no new npm packages
- SSR disabled on the canvas component (`dynamic(..., { ssr: false })`)
- GLSL ported **verbatim** from `FEATURE_IDEAS/hero-header/shaders.js` — HSV mask math, fluid sim, display compositing all preserved
- Render pipeline ported from `FEATURE_IDEAS/hero-header/script.js` — ping-pong `WebGLRenderTarget`s, two fluid sims, matrix-rain `CanvasTexture`
- Orange mask is **literal `#E38F4C`** — not palette-reactive, not bound to CSS vars
- Matrix rain kept as-is from the reference (colors may be tuned later, not in this phase)
- Videos `brent_1.mp4` and `brent_2.mp4` served from `dev/public/` (already staged), muted + autoplay + `playsInline` + `loop`
- Canvas is `position: absolute; inset: 0` inside the hero section, full viewport height (`100svh`), `overflow: hidden`
- No hero text overlay — videos contain the text (drop `HeroText` and the spot-color blocks from `HeroSection`)
- Fluid scene activates at viewport ≥1024px and not `prefers-reduced-motion`
- Fluid scene section sized to `brent_2.mp4`'s native aspect ratio (no cropping), capped at `max-height: 100svh`
- Below 1024 / reduced motion: no Three.js scene; render only `brent_2.mp4` at native aspect (section height wraps the video) against `bg-bg-base`
- TypeScript strict — typed uniforms, no `any`
- Follow `dev/AGENTS.md`: this Next.js has breaking changes; check `node_modules/next/dist/docs/` before touching routing/dynamic APIs

## FORMAT
- `dev/components/HeroFluidScene.tsx` (new, `'use client'`) — vanilla Three.js render pipeline, mouse handling, GL resource lifecycle + cleanup
- `dev/components/heroFluidShaders.ts` (new) — exported GLSL strings (fluid sim + display + HSV mask), ported from `shaders.js`
- `dev/components/HeroFluidFallback.tsx` (new) — static `object-contain` `brent_2.mp4` for mobile / reduced-motion
- `dev/components/HeroSection.tsx` — swap `AlbersScene` + `HeroText` + spot-color blocks for `HeroFluidScene` (with fallback gated via a media-query check)
- `dev/components/AlbersScene.tsx`, `HeroText.tsx`, `dev/public/models/albers.glb` — kept, not deleted (reference only, no longer imported)
- No new deps

## AGENTS
- [Before commit] Visual verifier — screenshots the homepage at desktop (1440×900) and mobile (375×812) viewports to confirm: (a) videos autoplay, (b) mouse movement reveals layers, (c) mobile viewport shows the fallback with fully-visible video (blocking)
- [Before commit] Quality gate — `npm run test:gate` from `dev/` (blocking)

## FAILURE (any = not done)
- [ ] Videos don't autoplay (missing `muted` / `playsInline`) or canvas shows black on load
- [ ] Mouse movement doesn't drive either fluid simulation
- [ ] HSV mask doesn't suppress the matrix-rain reveal on orange regions of `brent_2.mp4` (visible rain bleeding through orange)
- [ ] Fluid A doesn't reveal `brent_2.mp4` under `brent_1.mp4` across the whole frame
- [ ] Canvas bleeds outside the hero section or causes horizontal scroll
- [ ] GL resources (render targets, textures, geometries, materials, RAF) not disposed on unmount — memory leak on route change
- [ ] Mobile fallback doesn't trigger below 768px or under `prefers-reduced-motion`
- [ ] Mobile fallback video is cropped instead of fully visible (wrong `object-fit`)
- [ ] TypeScript errors or `any` in shader uniforms
- [ ] Build fails
- [ ] New console errors not added to `dev/e2e/known-errors.ts`
- [ ] Quality gate (`npm run test:gate`) does not pass
