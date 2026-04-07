# TDD Task Prompt
**Use when:** Starting any new implementation task

## The Prompt

```
Build [COMPONENT/FEATURE NAME].

It should:
- [Primary behavior]
- [Secondary behavior]
- [Error/edge case handling]

After you write the code, I'll test:
1. Happy path: [what I'll test first]
2. Error case: [what failure I'll try to trigger]
3. Edge case: [boundary condition to check]

Use [FRAMEWORK/LIBRARY] for [PURPOSE].
Follow these conventions:
- Components: PascalCase
- Functions: camelCase verbNoun
- [Other relevant conventions from CLAUDE.md]

Keep it simple enough to understand at 5pm on Friday.
```

## Frontend Example (React/TypeScript)

```
Build UserCard component.

It should:
- Display name, role, and status prominently
- Show key metrics with color coding
- Flash green/red when a value changes
- Handle missing data gracefully (show "N/A")

After you write the code, I'll test:
1. Happy path: Card renders with all data visible
2. Error case: Missing optional field doesn't crash
3. Edge case: Very long name doesn't overflow

Use React with TypeScript.
Follow these conventions:
- Component: UserCard.tsx in components/UserList/
- Props interface: UserCardProps
- Styling: TailwindCSS utility classes

Keep it simple enough to understand at 5pm on Friday.
```

## Backend Example (FastAPI/Python)

```
Build data fetch endpoint.

It should:
- Accept [param1], [param2] as query params
- Return array of items sorted by [field]
- Calculate [derived value] for each item
- Return 400 with helpful message for invalid params

After you write the code, I'll test:
1. Happy path: GET /api/items?param=value returns data
2. Error case: Invalid param value returns 400 error
3. Edge case: No matching items returns empty array

Use FastAPI with Pydantic.
Follow these conventions:
- File: api/items.py
- Response model: ItemResponse in schemas/item.py
- Use async/await for DB operations

Keep it simple enough to understand at 5pm on Friday.
```

## Why It Works

- **Specific behaviors** prevent over-engineering
- **Test cases up front** ensure Claude writes testable code
- **"I'll test"** reminds Claude it can't verify itself
- **"5pm Friday"** anchors readability expectations

## Tips

- Be explicit about which libraries (React Query, Recharts, etc.)
- Mention if component needs to handle loading/error states
- Specify TypeScript strictness expectations
- Note if this connects to specific API endpoints
- Reference `CLAUDE.md` for project-specific conventions
