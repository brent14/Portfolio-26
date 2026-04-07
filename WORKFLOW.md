# WORKFLOW.md — Development Workflow
*Claude Code has full browser access via Playwright MCP and can verify its own work.*

## The Reality

```
┌─────────────────────────────────────────────────────────────┐
│  Claude writes code (Vite hot-reloads)                      │
│           ↓                                                 │
│  Claude screenshots / snapshots the result via Playwright   │
│           ↓                                                 │
│  Claude runs quality gate (types + tests + E2E)             │
│           ↓                                                 │
│  If gate passes → commit. If not → fix and repeat.          │
│           ↓                                                 │
│  User reviews commit. Next task.                            │
└─────────────────────────────────────────────────────────────┘
```

---

## The Cycle
```
Explore (30min) → Build (1-3 days) → Extract (10min) → repeat
```

Each feature adds to `/patterns`. Each feature starts faster than the last.

---

## Phase 1: Explore (30 minutes max)

### The Five Questions
1. **What problem?** One sentence.
2. **Who benefits?** Primary user.
3. **What's success?** How do we know it works?
4. **What could break?** Top 2 risks.
5. **What patterns apply?** Check `/patterns` folder.

### Output
Copy `patterns/templates/PROJECT-TEMPLATE.md` to `PROJECT.md` and fill it in.

**If you can't answer these in 30 minutes, the feature is too vague.**

---

## Phase 2: Build (1-3 days)

### Web-Specific Task Rules
- **Size:** 2-4 hours each
- **Testability:** Must pass the quality gate (`npm run test:gate`)
- **Output:** Code that passes gate + visual verification screenshot

### The Development Loop
```
1. Describe behavior (or Claude proposes from context)
2. Claude writes code (Vite hot-reloads automatically)
3. Claude takes Playwright screenshot → visual verify
4. If wrong → Claude fixes → screenshot again → repeat
5. Claude runs quality gate (types + unit tests + E2E)
6. If gate fails → Claude fixes → re-run → repeat
7. Gate passes → commit
```

### What Claude Can Verify vs. What You Must Check
| Category | Claude Verifies (Playwright) | You Should Check |
|----------|------------------------------|------------------|
| Logic | Unit tests, type-check | Edge cases specific to your domain |
| API | E2E smoke tests, console errors | Auth tokens, real API credentials |
| UI | Screenshots, DOM snapshots | Subjective design feel, fine polish |
| Styling | Visual comparison before/after | Cross-browser, dark mode, mobile |
| Real-time | Page snapshots after wait | Extended session stability |
| Charts | Screenshot renders, no errors | Data accuracy, axis labels at scale |

### Parallel Agents for Independent Work

Claude can spawn **subagents** to handle independent tasks without blocking the main workflow:

```
Main thread: Building feature X
  └─ Agent 1: Running quality gate in background
  └─ Agent 2: Researching how [someHook] works
  └─ Agent 3: Fixing lint warning in unrelated file
```

**When to use agents:**
- Task is **independent** — doesn't depend on what's being built right now
- Task is **self-contained** — agent can complete it without back-and-forth
- Task would **block** the main thread (e.g., long test run)

**Examples:**
- Run `test:gate` in background while starting the next feature
- Research codebase patterns while planning an implementation
- Fix a failing test in one file while building a new component in another
- Explore an unfamiliar part of the codebase without polluting main context

**Not suitable for agents:**
- Tasks that depend on the current change (e.g., "test what I just wrote")
- Multi-step tasks requiring user decisions
- Tasks that modify the same files as the main thread

### Context Management
- **At 80% context:** Prepare refresh
- **At 90% context:** Immediately refresh
- **New feature:** Always start fresh
- **After break (hours/days):** Use warm-start prompt

**Context Refresh Prompt** (copy from `patterns/prompts/context-refresh.md`):
```
Continuing [feature]. Status:

DONE: [completed tasks]
NOW: [current task]
FILES: [what we've created/modified]

Continue with [specific next step].
```

**Warm Start Prompt** (copy from `patterns/prompts/warm-start.md`):
```
Resuming work on [FEATURE] after [TIME AWAY].

Read these files:
1. PROJECT.md
2. [specific files]

Tell me: current state, what was I working on, next step?
Don't start coding yet.
```

### When to Commit
- Quality gate passes (`npm run test:gate`)
- Visual verification screenshot confirms UI is correct
- Clear commit message
- **Phase complete:** Update `CODE_OVERVIEW.md` (see below)

### Git Flow
```bash
# Start feature
git checkout main && git pull
git checkout -b feature/[feature-name]

# After each working task
git add [specific files] && git commit -m "feat(scope): what this adds"

# Complete feature
git push -u origin feature/[feature-name]
```

### 📋 Completing a Phase (Phase 1, 2, 3, etc.)

When you finish a phase (Phase 1: Foundation, Phase 2: Core Backend, etc.), **you must update CODE_OVERVIEW.md**:

**What to Update:**

1. **"Current Status" section:**
   - Mark phase as ✅ complete
   - Keep completed phases visible (don't remove them)
   - Add completion date and commit hash

2. **"Data Flow" section:**
   - Add new data flow diagrams for new features
   - Update existing flows if they changed

3. **"Key Design Decisions" table:**
   - Add any new architectural decisions made
   - Update rationale if approaches evolved

4. **"Deep Dive" sections:**
   - Add new files/modules that do complex calculations or data transformations
   - Update existing deep dives if implementation changed significantly
   - Include: code snippets, data flow explanations, calculation formulas

**Commit Process:**
```bash
# After phase is complete and tested
git add CODE_OVERVIEW.md
git commit -m "docs: update CODE_OVERVIEW for Phase N completion

- Mark Phase N as complete
- Add deep dives for [new-module.py, new-component.tsx]
- Update data flow for [new feature]
"
```

**Why This Matters:**
- CODE_OVERVIEW.md serves as living documentation
- Future Claude sessions can understand the codebase faster
- Human developers (or future you) can onboard quickly
- Architecture decisions are preserved with context

---

## Phase 3: Extract (10 minutes, mandatory)

### Three Questions
After EVERY feature:

**1. What would help next time?**
→ Add to `/patterns/prompts/`

**2. What error format worked best?**
→ Note in `DEBUGGING.md`

**3. How accurate was our estimate?**
→ Note in PROJECT.md for calibration

### Phase Completion Checklist

After completing a **full phase** (not just individual tasks):

- [ ] All phase tasks complete and tested
- [ ] Update `CODE_OVERVIEW.md`:
  - [ ] Mark phase as ✅ complete in "Current Status"
  - [ ] Add/update "Data Flow" diagrams if applicable
  - [ ] Add/update "Key Design Decisions" if applicable
  - [ ] Add/update "Deep Dive" sections for new/changed files
- [ ] Update `PROJECT.md`:
  - [ ] Mark phase tasks as complete with actual times
  - [ ] Fill in "Phase N Retro" section with lessons learned
- [ ] Commit documentation updates
- [ ] Main feature commit with phase completion message

---

## Quick Reference

### Task Sizing
| Too Small | Right Size | Too Big |
|-----------|------------|---------|
| <30 min | 2-4 hours | >6 hours |
| Trivial change | Testable feature | Split it |
| "Change text" | "Add item card with details" | "Build entire data visualizer" |

### Prompt Selection

| Situation | Use This |
|-----------|----------|
| Starting new task | `tdd-task.md` |
| Continuing mid-session | `context-refresh.md` |
| New day, same feature | `warm-start.md` |
| Build errors you don't understand | `debug-build-error.md` |
| Approach not working | `stuck-rescue.md` |
| Ready to commit | `commit-message.md` |

### Quality Check (Before Commit)
- [ ] Quality gate passes: `cd frontend && npm run test:gate`
- [ ] Visual verification via Playwright screenshot (for UI changes)
- [ ] No `any` types without good reason
- [ ] Components under ~150 lines
- [ ] Commit message has type(scope): description
- [ ] New console errors added to `e2e/known-errors.ts` with reason (if any)

---

## Reporting Results to Claude

### Build Succeeded, Feature Works
```
✅ That worked. [Brief description of what you tested]
Let's continue with [next thing].
```

### Build Succeeded, Feature Broken
```
Runs but doesn't work right.

What I tested: [what you did]
Expected: [what should happen]
Actual: [what happened]
Console output / API response: [paste relevant output]
```

### Build Failed
```
Build error in [File.tsx/py] line [N]:

"[exact error message]"

Code around that line:
```typescript/python
[paste the relevant code]
```
```

### Runtime Error (Browser Console)
```
Error when [action].

Console output:
"[exact error message]"

Stack trace: [paste relevant parts]

Steps to reproduce:
1. [step]
2. [step]
3. Error occurs
```

### API Error (Backend)
```
API call failing to [endpoint].

Status: [500/404/etc]
Response body:
[paste JSON or error message]

Request parameters:
[paste request details]

Backend logs:
[paste relevant backend terminal output]
```

See `DEBUGGING.md` for detailed reporting formats.

---

## When Things Go Wrong

### Claude generates code that won't compile
→ This is normal. Paste the exact error.
→ Include file name, line number, and surrounding code.
→ Claude will fix it.

### Same error keeps coming back
→ Claude may be missing context about your project setup.
→ Check: Are imports correct? Is .env loaded?
→ Use `patterns/prompts/stuck-rescue.md`

### Feature works locally, fails in Docker
→ Common causes: environment variables, file paths, port conflicts
→ Report specifically what's different

### Claude's approach seems wrong
→ STOP before wasting iterations.
→ "Before we continue, is [X approach] the right way to do this in React/FastAPI?"
→ Or use `stuck-rescue.md`

### Task is taking 2x+ estimated time
→ Task is too big or poorly scoped.
→ Commit what works. Split the rest.
→ It's OK to stop and continue tomorrow.

### Estimates are always wrong
→ Track actual time in PROJECT.md
→ After 3-5 features, patterns emerge
→ Web dev with Claude is iterative — account for test/fix cycle

---

## Web-Specific Workflow Tips

### Frontend Features (React)
1. Get component rendering with mock data first
2. Add TypeScript types after basic structure works
3. Connect to real API after types are correct
4. Add styling/animations last
5. Test in multiple browsers (Chrome, Firefox, Safari)

### Backend Features (FastAPI)
1. Define Pydantic models first (request/response schemas)
2. Write endpoint skeleton with mock return data
3. Test with curl/Postman before adding logic
4. Add database operations after endpoint works
5. Add error handling after happy path works

### Database Changes
1. Write Alembic migration for schema changes
2. Test migration: `alembic upgrade head`
3. Verify tables in database: `docker-compose exec db psql -U [DB_USER] -d [DB_NAME]`
4. Test rollback: `alembic downgrade -1`
5. Commit migration file with code changes

### Real-Time Features
1. Get manual API call working first (one request)
2. Add polling with React Query `refetchInterval`
3. Test that updates happen automatically
4. Add visual indicators for stale/loading/error states
5. Consider WebSocket for true real-time (future enhancement)

### Chart/Visualization Features
1. Get hardcoded data rendering in chart first
2. Add axis labels, legends, tooltips
3. Connect to real data after chart structure works
4. Add interactivity (sliders, zoom, click events)
5. Test with edge cases (empty data, extreme values)

### Performance
1. Don't optimize until you see lag
2. Use browser DevTools Performance tab to identify bottlenecks
3. Common wins: React.memo, useMemo, useCallback, code splitting
4. Backend: async/await, database indexing, caching

---

## Docker Workflow

Docker runs **backend + database only**. Frontend runs natively with `npm run dev` for hot-reload during development.

### Start Development Environment
```bash
# Start backend + DB
docker-compose up -d

# Start frontend separately (hot-reload on :5173)
cd frontend && npm run dev

# View backend logs
docker-compose logs -f backend
```

### Rebuild After Code Changes
```bash
# Rebuild backend (needed for new pip packages)
docker-compose up -d --build backend

# Code changes auto-reload if volume is mounted
# New pip packages ALWAYS need rebuild
```

### Database Operations
```bash
# Access PostgreSQL shell
docker-compose exec db psql -U [DB_USER] -d [DB_NAME]

# Run migrations
docker-compose exec backend alembic upgrade head

# Create new migration
docker-compose exec backend alembic revision --autogenerate -m "description"
```

### Cleanup
```bash
docker-compose down        # Stop services
docker-compose down -v     # Stop + delete database data
```

---

## Testing Strategy

### Frontend Quality Gate (Required)
```bash
cd frontend

# Run the full gate — REQUIRED before every commit
npm run test:gate
# Runs in order: type-check → vitest unit tests → Playwright E2E

# Individual commands (for debugging failures):
npm run type-check       # TypeScript compilation
npm run test             # Vitest unit tests
npm run test:e2e         # Playwright smoke tests
npm run test:e2e:headed  # Same but visible browser (for debugging)
npm run lint             # ESLint
```

### Playwright E2E Details
- Smoke tests live in `frontend/e2e/smoke.spec.ts`
- Known acceptable errors tracked in `frontend/e2e/known-errors.ts`
- New console errors automatically fail the gate — fix them or add to known-errors with a reason
- Config: `frontend/playwright.config.ts`

See `DEBUGGING.md` for detailed error reporting formats.

### Visual Verification (During Development)
```
# Claude uses Playwright MCP tools directly:
browser_navigate → browser_take_screenshot → assess → fix if needed
browser_snapshot → read DOM accessibility tree for assertions
```

### Backend Testing
```bash
cd backend
pytest                      # Unit + integration tests
pytest tests/integration/   # Just integration
```

---

*The goal: Every feature makes the next one faster, even with the browser/API round-trip.*
