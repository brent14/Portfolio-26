# CONTRACT: Phase 1 — brentcarlin.com Portfolio Site

> Created: 2026-04-07
> Status: IN PROGRESS

## GOAL
A fully structured Next.js portfolio site in `dev/` with all pages, copy, navigation, a filterable 20-project work grid, SEO metadata on every page, JSON-LD structured data, `llms.txt` + `llms-full.txt`, sitemap, and robots.txt — deployable locally and ready for Phase 2 visual/animation work.

## CONSTRAINTS
- Next.js App Router only (no Pages router)
- TypeScript throughout — no `any` types
- Tailwind CSS only — no CSS modules, no inline styles
- Cream (#F5F0E8) + charcoal (#1C1C1C) as base palette; no final design decisions locked in
- React Three Fiber installed with a wireframe placeholder in hero — no real WebGL scene
- No CMS — all content is static data in TypeScript files
- No backend, no database, no Docker
- All 20 case study slugs must match exactly as defined in brentcarlin-homepage.md
- All copy verbatim from case-study-seo.md and brentcarlin-homepage.md
- MDX installed for lab but no articles required — index page + empty template only
- Resume page is layout placeholder only — no real content

## FORMAT
```
dev/
├── app/
│   ├── layout.tsx                  # Root layout, nav, footer, global metadata
│   ├── page.tsx                    # Homepage (hero, positioning, work grid, about, contact)
│   ├── work/
│   │   └── [slug]/page.tsx         # Dynamic case study pages (20 projects)
│   ├── resume/page.tsx             # Resume placeholder
│   ├── lab/
│   │   ├── page.tsx                # Lab index (placeholder cards)
│   │   └── [slug]/page.tsx         # Lab article template (empty)
│   ├── sitemap.ts                  # Auto-generated sitemap
│   └── robots.ts                   # robots.txt
├── components/
│   ├── Nav.tsx                     # Header nav, transparent/scroll behavior
│   ├── Footer.tsx                  # Footer with nav + social placeholders
│   ├── WorkGrid.tsx                # Filterable project grid
│   ├── WorkCard.tsx                # Individual project card
│   ├── FilterBar.tsx               # Tag filter UI
│   └── HeroPlaceholder.tsx         # R3F wireframe object (placeholder)
├── data/
│   └── projects.ts                 # All 20 projects: slug, title, tags, copy, thumbnail placeholder
├── public/
│   ├── llms.txt                    # LLM-readable site summary
│   └── llms-full.txt               # Full site content for LLM ingestion
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

JSON-LD structured data:
- Person schema on homepage
- WebSite schema on homepage
- CreativeWork schema on each case study page

## AGENTS
- [Kickoff] Explorer — reads SEO folder files to extract all copy and slugs before any code is written (parallel, one-shot)
- [Before commit] Visual verifier — screenshots homepage, one case study, resume, and lab index to confirm layout renders correctly (blocking)

## FAILURE (any = not done)
- [ ] Any case study slug doesn't match exactly as defined in brentcarlin-homepage.md
- [ ] Any copy deviates from case-study-seo.md or brentcarlin-homepage.md
- [ ] Work grid filter doesn't correctly show/hide projects by tag
- [ ] Any page missing <title>, <meta description>, OG tags, or canonical URL
- [ ] JSON-LD missing on any page (homepage or case study)
- [ ] llms.txt or llms-full.txt missing from public/
- [ ] TypeScript compilation errors
- [ ] React Three Fiber not installed (even if placeholder)
- [ ] Nav links don't resolve (Work → #work, About → #about, Contact → #contact, Resume → /resume)
- [ ] Console errors on any page
- [ ] Site doesn't run with npm run dev
