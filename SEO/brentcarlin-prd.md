# brentcarlin.com — Product Requirements Document

> Version 1.0 | Phase 1: Bare bones build with copy, placeholders, and correct structure.

---

## 1. Overview

A full-stack developer portfolio for Brent Carlin. Dual audience: recruiters and prospective freelance/agency clients. The site leads with emotional brand connection, uses WebGL/Three.js as a creative differentiator, and is structured to perform well on SEO targets identified through competitor keyword research.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| UI | React |
| 3D / WebGL | React Three Fiber, Three.js |
| Shaders | GLSL (as needed) |
| Animation | GSAP |
| Styling | Tailwind CSS or CSS Modules (TBD) |
| Type Safety | TypeScript |
| Content (Blog/Lab) | MDX (version controlled) |
| Deployment | TBD |
| Analytics | TBD |

---

## 3. Site Architecture

```
/                          Homepage
/work                      Work index (redirects to homepage #work or standalone — TBD)
/work/[slug]               Individual case study pages (20 projects)
/resume                    Resume page
/lab                       Blog / Articles / Labs
/lab/[slug]                Individual lab post
```

### Navigation (Header)
- Logo / Name: `Brent Carlin` (text-based, Rubik)
- Nav links: `Work` `About` `Resume` `Contact`
- `Contact` = anchor to email CTA section or mailto link
- `About` = anchor scroll to About section on homepage
- Mobile: hamburger or minimal collapsed nav
- Header behavior: transparent over hero, transitions on scroll

---

## 4. Homepage

### 4A — Hero Section
- Full viewport height
- **3D object** rendered in React Three Fiber: screen print aesthetic, lit scene
- **Animated typography overlay**: headline reveals line by line (GSAP or R3F)
- Scroll begins driving the Three.js scene
- **Headline:** *"I have 15 years of experience working with cross-functional teams to create websites and digital experiences for local and global brands."*
- **Placeholder:** 3D object + screen print shader (wireframe placeholder acceptable for phase 1)

### 4B — Positioning Block
- Single column, large text
- Three.js object continues transitioning with scroll
- Smaller triggered elements begin appearing

**Copy:**
> Over 15 years, I've built websites and digital experiences for brands ranging from global automotive dealers to nonprofit advocacy groups. My work spans the full stack, from GSAP-driven animations and WebGL to CRM integrations, platform architecture, and the DevOps infrastructure that keeps it all running. I have collaborated closely with art directors, brand teams, and engineers, treating animation as storytelling and technical decisions as brand decisions. The approach that unifies all these projects is to build something that works as well as it feels.

### 4C — Work Grid
- **Layout:** 3-column grid, responsive (2-col tablet, 1-col mobile)
- **Each card:** Thumbnail image placeholder + Project title + Tag pills
- **Filter bar:** Tag-based filtering, multi-select
- **Filter tags:** `Animation` `Brand Campaign` `CRM & Data` `WordPress` `Platform Build` `DevOps` `Mobile`
- Animation: ambient WebGL elements in background, non-competing with grid

**Project order (default — can be reordered):**
See `/work` URL list in `brentcarlin-homepage.md`

### 4D — About Section
- Single column
- Anchor: `#about`

**Copy:**
> For 15 years I've had the pleasure of building websites and digital experiences for clients I genuinely love, from global automotive brands and scrappy nonprofits to regional newspapers, fishing tournaments, and everything in between. Most of that work is the unglamorous kind: the CRM pipelines, CMS architecture, and DevOps infrastructure that makes everything else possible. But every now and then I get to make something move, and that's where the real satisfaction lives. My favorite projects are the animation ones, where motion complements the message and says something more than static design. Based in South Florida, when I'm not pushing code and pixels I'm noodling with electronics, screen printing, or trying to grow my hot pepper empire.

- **Placeholder:** Portrait photo

### 4E — Contact CTA
- Anchor: `#contact`
- Short CTA line (TBD — example: *"Have a project in mind? Let's talk."*)
- Email link: `mailto:` — email address TBD
- Email: `brent@brentcarlin.com`
- No form in phase 1

### 4F — Footer
- Copyright line
- Nav links repeated: Work, About, Resume, Contact
- Social links (placeholders — GitHub, LinkedIn, others TBD)

---

## 5. Case Study Pages (`/work/[slug]`)

### URL List
See `brentcarlin-homepage.md` — Work Pages URLs section for all 20 slugs.

### Page Structure

```
HEADER        WebGL / Three.js element tangentially related to project (TBD per project)
              Placeholder: solid color block with project name for phase 1

HERO          Project title (Headline from case-study-seo.md)
              Tags (from case-study-seo.md)

BODY          Body copy (from case-study-seo.md)

MEDIA         Image grid or video embed
              Placeholder: gray image blocks for phase 1
              Note: Covergirl, Porsche Expedition have animation video

NEXT PROJECT  Link to next case study (circular)
```

### SEO Per Page
- `<title>`: Headline — Brent Carlin
- `<meta description>`: Body copy sentence 1
- `<og:image>`: Project thumbnail placeholder
- Canonical URL matching slug

---

## 6. Resume Page (`/resume`)

- Clean, well-formatted layout
- Printable / PDF-friendly styling
- Sections: Experience, Skills, Education (TBD)
- Download PDF button
- **Placeholder:** Full resume content TBD

---

## 7. Blog / Lab (`/lab`)

### Purpose
- SEO content targeting keywords from research
- Show work in progress, experiments, tutorials
- Priority keyword targets for articles:
  - `GSAP animation tutorial`
  - `React Three Fiber scroll`
  - `WordPress headless CMS`
  - `parallax scroll animation`
  - `fluid film WebGL`

### Index Page (`/lab`)
- Card grid (2-col)
- Each card: Title + date + tag + excerpt

### Article Page (`/lab/[slug]`)
- Title, date, tags
- Body content (MDX)
- Code blocks
- Related articles

### Phase 1 scope
- Index page with placeholder cards
- One article template
- No content required in phase 1

---

## 8. Design System

### Typography
| Use | Font | Notes |
|---|---|---|
| Headlines (H1–H2) | Rubik | Bold weight |
| Sub-headlines (H3–H4) | TBD | Geometric sans or slab |
| Body copy | TBD | Suggestions: DM Sans, IBM Plex Sans |
| Labels / Tags / Code | IBM Plex Mono | Monospace, screen print feel |

**Font pairing suggestions to evaluate:**
- Rubik + DM Sans + IBM Plex Mono
- Rubik + Instrument Serif + IBM Plex Mono (adds editorial contrast)

### Color Palette
- **Base:** Neutral (warm off-white, cream, or dark charcoal — TBD)
- **Approach:** 2–3 spot colors that overlap to create additional colors via mix-blend-mode or layering (screen print / risograph effect)
- **Example direction:** Cream base + cobalt + warm red → overlaps create purple and orange
- Dark/light mode: secondary consideration, not blocking phase 1

### Animation Principles
- Hero: full WebGL, scroll-driven
- Positioning block: Three.js transitions on scroll
- Work grid: ambient, non-competing
- Page transitions: subtle
- Reduced motion: respect `prefers-reduced-motion`

---

## 9. SEO Requirements

### Global
- `next/head` or Next.js metadata API for all pages
- Sitemap (`/sitemap.xml`) auto-generated
- Robots.txt
- OG tags on all pages
- Canonical URLs

### Per Case Study
- Title: `[Project Headline] — Brent Carlin`
- Description: First sentence of body copy
- Tags used as keywords

### Priority pages for SEO
1. `/work/full-lifecycle-wordpress-cms-management`
2. `/work/wordpress-boat-dealer-locator-crm`
3. `/work/higher-education-lead-generation-salesforce`
4. `/work/devops-architecture-aws-cloudflare-security`
5. `/work/covergirl-parallax-scroll-animation`

---

## 10. Phase Breakdown

### Phase 1 — Structure + Copy (current scope)
- [ ] Next.js project setup with App Router
- [ ] React Three Fiber installed, placeholder 3D object in hero
- [ ] All pages created with correct URLs
- [ ] All copy in correct sections
- [ ] Image/video placeholders in place
- [ ] Header + nav functional
- [ ] Work grid with filter (static data, no CMS)
- [ ] Case study pages (all 20, copy only + placeholders)
- [ ] Resume page (placeholder layout)
- [ ] Lab index + one article template (empty)
- [ ] Contact CTA (mailto link)
- [ ] Basic SEO metadata on all pages
- [ ] Sitemap + robots.txt
- [ ] Deployed to staging

### Phase 2 — Design + Animation
- [ ] Final typography implementation
- [ ] Color system + screen print palette
- [ ] Hero WebGL scene (3D object, screen print shader)
- [ ] Scroll-driven Three.js transitions
- [ ] Ambient animation elements throughout page
- [ ] Case study WebGL headers (per project)
- [ ] Dark/light mode toggle
- [ ] Page transitions

### Phase 3 — Content + SEO
- [ ] Real imagery and video for all case studies
- [ ] First 3 lab articles published
- [ ] Resume content finalized
- [ ] OG images per page
- [ ] Performance audit (Core Web Vitals)
- [ ] Accessibility audit

---

## 11. Open Questions

- [ ] Deployment platform (Vercel presumed)
- [ ] Analytics tool
- [x] CMS for lab/blog content — MDX, version controlled
- [x] Email address — brent@brentcarlin.com
- [ ] Social links — placeholders in place, URLs TBD
- [x] Final hero headline — "I have 15 years of experience working with cross-functional teams to create websites and digital experiences for local and global brands."
- [ ] Body copy font final selection
- [ ] Color palette direction (light vs. dark base)
- [ ] Resume content
- [ ] Case study WebGL header concept per project
