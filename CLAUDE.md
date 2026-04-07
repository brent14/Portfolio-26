# CLAUDE.md — [PROJECT_NAME]

This file provides guidance to Claude Code when working with this project.
Fill in the bracketed placeholders when starting a new project.

## ⚠️ Contract First — Required Before Starting Any Feature

**Every feature MUST have an approved contract before any code is written.**

```
/contract  →  user approves  →  then build
```

1. Run `/contract` with a feature description
2. Present the contract (GOAL, CONSTRAINTS, FORMAT, FAILURE) to the user
3. **Wait for explicit approval** — do not write code until approved
4. CONTRACT.md is the source of truth for what "done" means — agents reference it

**Agent team spawn criteria — only use a team when ALL are true:**

- Tasks are genuinely parallel (no dependency between them)
- Tasks touch different files (shared file edits = conflicts)
- Each task is substantial enough to warrant its own context window

If tasks are sequential or share files → single session is simpler and safer.

---

## ⚠️ Quality Gate — Required Before Completing Any Task

**Every task MUST pass the quality gate before being marked complete.**

```bash
# Replace with your project's quality gate command:
[QUALITY_GATE_COMMAND]
# Example: cd frontend && npm run test:gate
```

This should run, in order:

1. `type-check` — TypeScript compilation (no `any` leaks)
2. `test` — Unit tests
3. `test:e2e` — E2E smoke tests (all key pages/flows render, no new console errors)

**If the gate fails, the task is NOT done.** Fix the issue before proceeding.

**New console errors:** The E2E suite tracks known errors in `e2e/known-errors.ts`. If your change introduces a new console error, either fix it or add it to the known-errors file with a reason. The gate will reject unknown errors.

### Visual Verify Loop — Build → See → Fix

After any UI change, visually verify before moving on:

1. Make the code change (Vite hot-reloads)
2. `browser_navigate` to the affected page
3. `browser_take_screenshot` — **save all screenshots to the `screenshots/` folder**, not the repo root. Both `screenshots/` and `*.png` are gitignored.
4. If wrong, fix and repeat. If right, continue.

**Two browsers available:**

| Tool                         | When to Use                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Playwright MCP** (default) | Standard UI verification, E2E tests, console error checks. Always available — own Chromium instance.                      |
| **Chrome CDP** (fallback)    | When you need the user's auth state, exact viewport, extensions, or when Playwright can't render something (e.g., WebGL). |

**Chrome CDP setup** (one-time, when needed):

```bash
# Terminal 1: Launch Chrome with debugging
./scripts/chrome-debug.sh

# Terminal 2: Register the MCP server
claude mcp add playwright-chrome -- npx @playwright/mcp@latest --cdp-endpoint http://localhost:9222
```

Claude then has both `mcp__playwright__*` (standalone) and `mcp__playwright-chrome__*` (user's Chrome) tools. Use Playwright by default; switch to Chrome only when the standalone browser isn't sufficient.

### Parallel Agents for Independent Work

Use the **Task tool** to spawn subagents for work that doesn't depend on the current task:

| Use Case                                     | Agent Type        | Example                                  |
| -------------------------------------------- | ----------------- | ---------------------------------------- |
| Run quality gate while building next feature | `Bash`            | `[QUALITY_GATE_COMMAND]`                 |
| Research unfamiliar code                     | `Explore`         | "How does the [module] work?"            |
| Fix isolated issue in separate file          | `general-purpose` | "Fix lint warning in [file].ts"          |
| Plan an implementation approach              | `Plan`            | "Design the [feature] component"         |

**Rules:**

- Only for tasks **independent** of the current work (no shared file edits)
- Agent results come back as a message — summarize findings to the user
- Run agents **in the background** when you don't need results immediately
- Prefer **foreground** when the result informs your next step

---

## Project Overview

**[PROJECT_NAME]** — [One sentence describing what the project does]

**Design Aesthetic:** [Describe the visual style, e.g., "data-dense trading dashboard with warm palette"]

**Tech Stack:**
- **Frontend:** [e.g., React 18 + TypeScript, TailwindCSS, React Query, D3]
- **Backend:** [e.g., FastAPI + Python, PostgreSQL, SQLAlchemy]
- **Testing:** [e.g., Vitest, Playwright]
- **Dev Server:** [e.g., Vite, Docker Compose]

**Target:** [e.g., Modern browsers — Chrome, Firefox, Safari, Edge]

**Target Audience:** [Who uses this and what they care about]

---

## Development System

This project uses the **Flywheel Development System** for AI pair programming.

### Key Files

| File               | Purpose                                                      | When to Reference                                                                                            |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `CONTRACT.md`      | Active feature contract (GOAL, CONSTRAINTS, FORMAT, FAILURE) | Every session — if it exists, a feature is in progress                                                       |
| `PROJECT.md`       | Current feature context                                      | Every session, update constantly                                                                             |
| `CODE_OVERVIEW.md` | Architecture & code deep dives                               | Understanding codebase, onboarding                                                                           |
| `WORKFLOW.md`      | Development process                                          | When starting features                                                                                       |
| `DEBUGGING.md`     | How to report issues                                         | When something breaks                                                                                        |
| `docs/data-flow/`  | Mermaid diagrams of API data flows                           | Before modifying or adding API endpoints                                                                     |
| `/patterns/`       | Reusable prompts                                             | Before starting tasks                                                                                        |
| `FOR[name].md`     | Personalized learning document                               | End of project or major phase                                                                                |

### Git Log as Project History

Completed feature contracts are embedded in commit messages. To understand what has been built, why, and what success criteria were met:

```bash
# See all completed contracts (features with defined success criteria)
git log --oneline --grep="Contract:"

# See full contract details for a specific commit
git log --grep="Contract:" --format=full

# See recent feature work
git log --oneline -20
```

**Always check git log when orienting to a project** — it's the authoritative history of what was built, what the goals were, and what failure conditions were verified.

### Learning Documentation (FOR[name].md)

For every project, write a detailed `FOR[yourname].md` file that explains the whole project in plain language.

**Include:**

- **Technical architecture** — How the system is designed and why
- **Codebase structure** — How the various parts are connected
- **Technologies used** — What tools/frameworks and why we chose them
- **Technical decisions** — The reasoning behind key choices
- **Lessons learned** — Including:
  - Bugs we ran into and how we fixed them
  - Potential pitfalls and how to avoid them in the future
  - New technologies used and what we learned
  - How good engineers think and work
  - Best practices discovered

**Writing style:**

- Make it engaging to read, not boring technical documentation
- Use analogies and anecdotes to make concepts understandable and memorable
- Write as if explaining to a smart friend who wants to learn from your experience

### The Cycle

```
Explore (30min) → Build (1-3 days) → Extract (10min) → repeat
```

---

## Conventions

### Naming

- **Components:** PascalCase (`UserCard`, `DataGrid`, `StatusChart`)
- **Hooks:** camelCase with `use` prefix (`useUsers`, `useItems`)
- **Functions:** camelCase, verbNoun (`calculateTotal`, `formatPrice`, `fetchItems`)
- **Files:** PascalCase matching type for components, camelCase for utilities
  - Components: `MyComponent.tsx`
  - Hooks: `useMyHook.ts`
  - Utils: `calculations.ts`, `formatting.ts`
- **Types/Interfaces:** PascalCase (`UserData`, `ApiResponse`)
- **API Endpoints:** snake_case in backend, camelCase in frontend after transformation

### React/TypeScript Patterns

- Use **functional components** with hooks exclusively
- Use **TypeScript** for all files (`.tsx` for components, `.ts` for utilities)
- Prefer `interface` over `type` for object shapes
- Use **React Query** for all API calls (caching, refetching, loading states)
- Extract custom hooks for reusable logic
- Use **TailwindCSS** for all styling (no CSS modules, no styled-components)
- Prefer composition over prop drilling (use context sparingly)

### Component Organization

```tsx
// 1. Imports (external → internal → types)
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MySubComponent } from "./MySubComponent";
import type { MyData } from "@/types";

// 2. Types/Interfaces (if component-specific)
interface MyComponentProps {
  id: string;
  label: string;
}

// 3. Component
export function MyComponent({ id, label }: MyComponentProps) {
  // Hooks first
  const { data, isLoading } = useMyData(id);
  const [selected, setSelected] = useState<string | null>(null);

  // Early returns
  if (isLoading) return <Loading />;
  if (!data) return <Error />;

  // Render
  return <div className="...">{/* JSX */}</div>;
}
```

### Error Handling

- **Frontend:** Use React Query's error states, display user-friendly messages
- **Backend:** Return HTTP status codes with descriptive error messages
- **API calls:** Always handle network errors, timeouts, invalid responses
- **Calculations:** Return `null` for invalid inputs, throw for system failures
- Log errors with context: `console.error('[ComponentName] Failed to fetch:', error)`

### Python Backend Patterns

- Use **FastAPI** with async/await for all endpoints
- Use **Pydantic** models for request/response validation
- Use **SQLAlchemy ORM** for database operations
- Type hints on all functions
- Docstrings for complex calculations
- Return `None` for expected failures, raise exceptions for system errors

### Testing Layers

- **Unit tests** (`npm run test`): Calculations, data transformations, hooks, utilities
- **Type checking** (`npm run type-check`): TypeScript compilation
- **E2E smoke tests** (`npm run test:e2e`): Playwright verifies all key pages render without crashes or new console errors
- **Quality gate** (`[QUALITY_GATE_COMMAND]`): Runs all three above — **required before completing any task**
- **Visual verification**: Playwright MCP screenshots during development

---

## Development Commands

### Frontend (React)

```bash
cd frontend

# Install dependencies
npm install

# Development server (http://localhost:5173)
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview

# E2E smoke tests (requires stack running)
npm run test:e2e

# Quality gate — REQUIRED before completing any task
npm run test:gate
```

### Backend (Python/FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install dependencies
pip install -r requirements.txt

# Run development server (http://localhost:8000)
uvicorn app.main:app --reload

# Database migrations
alembic upgrade head
alembic revision --autogenerate -m "description"

# Run tests
pytest
```

### Docker (Full Stack)

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up --build
```

---

## Commit Message Format

```
type(scope): short description

- Detail about what changed
- Another detail if needed
```

**Types:** `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`

**Scopes:** [Define your project's scopes here — e.g., `frontend`, `backend`, `api`, `db`, `ui`]

**Examples:**

```
feat(ui): add interactive chart with time slider

- Generate curve using real-time data
- Time slider to visualize changes
- IV slider for scenario analysis

fix(api): handle missing data for edge cases

- Return null instead of crashing when data unavailable
- Display "N/A" in cells for missing values
- Added fallback calculation
```

### 📋 Update CODE_OVERVIEW.md on Phase Completion

**IMPORTANT:** When completing a phase (Phase 1, Phase 2, etc.), you MUST update `CODE_OVERVIEW.md`:

1. **Update "Current Status" section:**
   - Mark completed phase as ✅
   - Keep completed phases visible (don't delete them)
   - Move next phase to top of future phases list

2. **Update "Data Flow" section (if changed):**
   - Add new data flows for new features
   - Update existing flows if they changed

3. **Update "Key Design Decisions" (if changed):**
   - Add new decisions made during the phase
   - Update rationale if approaches changed

4. **Add/Update "Deep Dive" sections:**
   - Add new modules that do complex calculations or visualizations
   - Update existing deep dives if implementation changed
   - Include code snippets, data flow diagrams, calculation formulas

5. **Commit CODE_OVERVIEW.md with the phase:**
   ```bash
   git add CODE_OVERVIEW.md
   git commit -m "docs: update CODE_OVERVIEW.md for Phase N completion"
   ```

**Think of CODE_OVERVIEW.md as a living architecture document** — it grows with the project and serves as onboarding material for future Claude sessions or human developers.

---

## Architecture

### Project Structure

```
[project-root]/
├── [FILL IN YOUR STRUCTURE]
│
├── backend/
│   ├── app/
│   │   ├── main.py             # FastAPI entry point
│   │   ├── config.py           # Pydantic settings
│   │   ├── database.py         # SQLAlchemy setup
│   │   │
│   │   ├── api/                # REST endpoints
│   │   ├── models/             # SQLAlchemy models
│   │   ├── services/           # Business logic
│   │   └── schemas/            # Pydantic request/response models
│   │
│   ├── alembic/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── hooks/              # React Query hooks (one per data domain)
│   │   ├── services/api.ts     # Axios client
│   │   ├── utils/
│   │   └── types/index.ts      # All TypeScript interfaces
│   │
│   ├── e2e/                    # Playwright E2E tests
│   │   ├── smoke.spec.ts
│   │   └── known-errors.ts     # Acceptable console error patterns
│   ├── playwright.config.ts
│   ├── package.json
│   └── tailwind.config.js
│
└── scripts/
    └── chrome-debug.sh         # Chrome CDP for Playwright fallback
```

---

## Data Models

Data models are defined in two places — keep them in sync:

- **Frontend:** `frontend/src/types/index.ts` — All TypeScript interfaces
- **Backend:** `backend/app/schemas/` — Pydantic request/response models
- **Database:** `backend/app/models/` — SQLAlchemy models

---

## Current State

**🎯 Current Focus:** See `PROJECT.md`

**📋 Implementation Phases:**

1. ⬜ Phase 1 — [description]
2. ⬜ Phase 2 — [description]
3. ⬜ Phase 3 — [description]

See `CODE_OVERVIEW.md` for detailed phase notes.

---

## Web Development Principles

**For a data-dense application, prioritize:**

### Visual Design

- **High information density** — Pack data efficiently without clutter
- **Color coding** — Use color to convey meaning (status, severity, categories)
- **Scanability** — Grid layouts, consistent spacing, aligned columns
- **Responsive design** — Work on laptop screens (1366x768+) and large monitors

### Interaction Design

- **Keyboard navigation** — Arrow keys in grids, hotkeys for common actions
- **Real-time updates** — Visual indicators when data refreshes
- **Loading states** — Show skeletons or spinners, never blank screens
- **Hover interactions** — Tooltips for explanations, highlights for context
- **Click interactions** — Obvious clickable elements, visual feedback

### Performance

- **Fast initial load** — Code splitting, lazy loading for charts
- **Smooth updates** — Debounce inputs, throttle polling, memoize calculations
- **Efficient rendering** — React.memo for grid cells, virtualization for long lists
- **Optimistic updates** — Update UI before API confirms (where appropriate)

### Data Visualization

- **Clear axes and labels** — Always label chart axes, include units
- **Interactive tooltips** — Show exact values on hover
- **Consistent color schemes** — Use same colors for same concepts across app
- **Responsive charts** — Charts scale with container, maintain aspect ratio

---

## Anti-Patterns to Avoid

| Anti-Pattern               | Watch For                                | Instead                                        |
| -------------------------- | ---------------------------------------- | ---------------------------------------------- |
| Prop drilling              | Passing props through 3+ levels          | Use React Context or lift state to parent      |
| Fetch in useEffect         | `useEffect(() => fetch(...))`            | Use React Query's useQuery hook                |
| Any types                  | `any`, `as any`                          | Define proper TypeScript interfaces            |
| Inline styles              | `style={{...}}`                          | Use TailwindCSS classes                        |
| Magic numbers              | Hard-coded values without names          | Define constants with descriptive names        |
| Mutation                   | `array.sort()`, modifying state directly | Return new objects/arrays                      |
| Missing error handling     | No try-catch, no error boundaries        | Handle all async operations, use ErrorBoundary |
| Console.logs in production | Debugging logs left in code              | Remove or gate behind dev flag                 |

### Web-Specific Gotchas

| Gotcha          | Symptom                              | Fix                                            |
| --------------- | ------------------------------------ | ---------------------------------------------- |
| CORS errors     | API calls fail from browser          | Configure CORS in FastAPI backend              |
| Stale data      | Old data shows after update          | React Query cache invalidation                 |
| Memory leaks    | Slow down over time                  | Clean up timers, subscriptions in useEffect    |
| Race conditions | Wrong data shows after quick actions | Use React Query, avoid manual state management |
| Bundle size     | Slow initial load                    | Code splitting, tree shaking, lazy imports     |
| Re-renders      | UI feels sluggish                    | Memoization, proper key props in lists         |

---

## When Things Go Wrong

### Build / TypeScript errors

→ Claude detects these via quality gate — auto-fixes before committing
→ If you see one Claude missed, paste the exact error

### UI doesn't match expectation

→ Claude verifies via Playwright screenshot — but subjective feel is yours to judge
→ Describe what feels wrong: "too cramped", "colors clash", "hard to scan"

### API errors

→ Claude checks console errors via E2E smoke tests
→ For backend-specific issues: paste `docker-compose logs -f backend` output

### Claude generates wrong approach

→ STOP. Don't iterate on broken approach.
→ Ask: "What's the simplest version that could work?"

### Context seems lost

→ Use warm-start prompt from `WORKFLOW.md`
→ Or reference `PROJECT.md` for current focus

---

## Dependencies

### Frontend (key packages)

- **react** ^18 + **react-dom** — UI framework
- **@tanstack/react-query** ^5 — Server state, caching, auto-refetch
- **axios** — HTTP client
- **tailwindcss** — Utility-first CSS
- **@playwright/test** — E2E smoke tests
- **vitest** — Unit tests
- [Add project-specific packages here]

### Backend (key packages)

- **fastapi** + **uvicorn** — Async API server
- **sqlalchemy** + **alembic** + **psycopg2-binary** — PostgreSQL ORM + migrations
- **pydantic** + **pydantic-settings** — Validation + env config
- **httpx** — Async HTTP client
- [Add project-specific packages here]

See `frontend/package.json` and `backend/requirements.txt` for exact versions.

---

## Environment Variables

```bash
# Backend (.env)
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Frontend (.env)
VITE_API_URL=http://localhost:8000

# Add project-specific variables here
```

---

## API Reference

### Backend API Routers

| Router  | Prefix       | Purpose             |
| ------- | ------------ | ------------------- |
| [name]  | `/api/[path]`| [what it does]      |

### React Query Conventions

- **staleTime:** 55s (aligned with 60s refetchInterval, adjust per project)
- **refetchInterval:** 60s for polling data hooks
- **queryKey:** `['domain', ...params]`
- Each data domain has its own hook file

---

## Testing

### Quality Gate (Required before every commit)

```bash
[QUALITY_GATE_COMMAND]
# Runs: type-check → unit tests → Playwright E2E
```

### Individual Test Commands

```bash
# Frontend
cd frontend
npm run type-check          # TypeScript compilation
npm run test                # Vitest unit tests
npm run test:e2e            # Playwright smoke tests
npm run test:e2e:headed     # Same, visible browser (for debugging)
npm run lint                # ESLint

# Backend
cd backend
pytest                      # All tests
pytest -v                   # Verbose output
pytest tests/test_[file].py # Specific file
```

---

## Deployment Considerations

### Development

- Docker Compose for local development
- Hot reload for both frontend (Vite) and backend (uvicorn)
- PostgreSQL data persists in Docker volume

### Production (Future)

- Frontend: Vercel, Netlify, or CloudFlare Pages
- Backend: AWS Lambda, Google Cloud Run, or Railway
- Database: Supabase, AWS RDS, or managed PostgreSQL
- Environment-specific configs (.env.production)

---

## Additional Resources

- **React Query Docs**: https://tanstack.com/query/latest
- **TailwindCSS Docs**: https://tailwindcss.com/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com
- **Playwright Docs**: https://playwright.dev/docs/intro
- [Add project-specific resources here]
