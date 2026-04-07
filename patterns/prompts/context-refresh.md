# Context Refresh Prompt
**Use when:** Context >80%, Claude seems confused, or starting to contradict earlier decisions

## The Prompt

```
Continuing [FEATURE NAME]. Here's where we are:

COMPLETED:
- [x] [Task 1 with brief description]
- [x] [Task 2 with brief description]

CURRENT TASK:
[What we're working on now]

KEY DECISIONS:
- [Framework/library choice and why]
- [Architecture pattern we're using]
- [Naming conventions established]

FILES WE'VE CREATED:
- [file.tsx/py] — [what it does]
- [file.tsx/py] — [what it does]

WHAT WORKS:
- [Feature that's been tested and confirmed]

WHAT'S BROKEN/NEXT:
- [Current issue or next step]

Continue with [SPECIFIC NEXT STEP].
```

## Example

```
Continuing [My Feature]. Here's where we are:

COMPLETED:
- [x] API endpoint with data fetching and validation
- [x] Frontend component with data display
- [x] Filter controls (date range, category)

CURRENT TASK:
Real-time update indicators when data refreshes

KEY DECISIONS:
- Using React Query with 60-second refetch interval
- TailwindCSS for all styling
- Sorting by [field] with configurable direction

FILES WE'VE CREATED:
- backend/app/api/[name].py — data endpoints
- frontend/src/components/[Name]/[Name].tsx — main component
- frontend/src/hooks/use[Name].ts — React Query hook

WHAT WORKS:
- GET /api/[name] returns sorted data
- Component renders all fields correctly
- Filters update query params

WHAT'S BROKEN/NEXT:
- Need to flash green/red when values change between refreshes

Continue with implementing the value change indicator animation.
```

## Why It Works

- **Structured format** gives Claude exactly what it needs
- **Completed tasks** shows what patterns are established
- **Key decisions** prevents Claude from switching approaches
- **What works** avoids re-breaking working code
- **Specific next step** focuses the response

## When to Use

- Context indicator >80%
- Claude starts contradicting earlier decisions
- Response quality degrades
- After pasting several error/fix cycles
