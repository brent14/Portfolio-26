# Debug Build Error Prompt
**Use when:** TypeScript/Python build fails with compiler error

## The Prompt

```
Build error in [FILE] line [N]:

"[EXACT ERROR MESSAGE]"

Here's the code around that line:
```typescript  // or ```python
[paste ~10 lines of context around the error]
```

Related context:
- [Any relevant imports or type definitions]
- [What this code is trying to do]

Fix this error.
```

## TypeScript Example

```
Build error in frontend/src/components/UserGrid/UserGrid.tsx line 47:

"Property 'role' does not exist on type 'UserSnapshot'"

Here's the code around that line:
```typescript
function renderCell(user: UserSnapshot) {
    const color = getStatusColor(user.role)  // <- Error here
    return <div style={{ backgroundColor: color }}>
}
```

Related context:
- UserSnapshot interface is in types/index.ts
- Trying to get role for color coding

Fix this error.
```

## Python Example

```
Build error when running uvicorn:

"ImportError: cannot import name 'ItemResponse' from 'app.schemas.item'"

Here's the import statement:
```python
from app.schemas.item import ItemResponse, ItemRequest
```

Related context:
- schemas/item.py exists but may not export ItemResponse
- This is in api/items.py

Fix this error.
```

## Why It Works

- **Exact error** — No paraphrasing, exact compiler message
- **Line number** — Pinpoints the problem
- **Context** — Shows surrounding code for understanding
- **Related info** — Helps Claude understand intent

## Common TypeScript Errors

### Type Mismatch
```
"Type 'number | undefined' is not assignable to type 'number'"
→ Need optional chaining, nullish coalescing, or type guard
```

### Missing Property
```
"Property 'X' does not exist on type 'Y'"
→ Check interface definition, may need to add property
```

### Import Errors
```
"Cannot find module '@/types' or its corresponding type declarations"
→ Check tsconfig paths, or use relative import
```

### React-Specific
```
"Type '{ children: Element; }' has no properties in common with type 'IntrinsicAttributes'"
→ Props interface missing or component doesn't accept children
```

## Common Python/FastAPI Errors

### Import Errors
```
"ImportError: cannot import name 'X' from 'Y'"
→ Check if X is exported from Y, circular import issue
```

### Type Errors
```
"value is not a valid integer"
→ Pydantic validation failed, check request params
```

### Async Errors
```
"object Response can't be used in 'await' expression"
→ Missing async on function or calling sync function with await
```

## What to Include

Include:
- Exact error message (copy/paste)
- File name and line number
- Code around the error (~10 lines)
- What you're trying to accomplish
- Relevant type/interface definitions

Don't include:
- Paraphrased error messages
- Entire file contents
- Unrelated code
