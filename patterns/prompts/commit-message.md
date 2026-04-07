# Commit Message Prompt
**Use when:** Ready to commit working code

## The Prompt

```
Write a commit message for this change.

**What changed:** [brief description]
**Why:** [the reason/motivation]
**Files touched:** [list main files]

Use this format:
type(scope): short description (50 chars max)

- Bullet point details
- Another detail if needed

Types: feat, fix, refactor, test, docs, chore
Scopes: [list your project's scopes from CLAUDE.md]
```

## Example

```
Write a commit message for this change.

**What changed:** Added user profile card component with avatar and stats
**Why:** Users need to see their account details at a glance
**Files touched:** ProfileCard.tsx, ProfileView.tsx, types/index.ts

Use this format:
type(scope): short description (50 chars max)

- Bullet point details
- Another detail if needed
```

## Output Example

```
feat(ui): add profile card with stats display

- Shows avatar, name, and key account metrics
- Color-coded status badge
- Click to open detailed view
- Handles missing data gracefully
```

## Type Reference

| Type | Use When |
|------|----------|
| `feat` | New functionality |
| `fix` | Bug fix |
| `refactor` | Code restructure, no behavior change |
| `test` | Adding/updating tests |
| `docs` | Documentation only |
| `chore` | Build, config, dependencies |
| `style` | Formatting, whitespace only |

## Scope Reference

Define your project's scopes in `CLAUDE.md`. Common defaults:

| Scope | Area |
|-------|------|
| `frontend` | General React/TypeScript changes |
| `backend` | General Python/FastAPI changes |
| `api` | API endpoints and routing |
| `db` | Database models, migrations |
| `ui` | UI components |
| `auth` | Authentication/authorization |

## Anti-Patterns

Avoid:
- "WIP"
- "Fixed stuff"
- "Updates"
- "Changes"
- Messages longer than the code change

Good:
- Clear what changed
- Clear why
- Specific scope
- Under 50 chars for first line
