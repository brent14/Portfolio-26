# Debug Runtime Error Prompt
**Use when:** App crashes at runtime (browser console error or API 500)

## The Prompt

```
Runtime error when [ACTION].

**Error message:**
```
[EXACT ERROR from console or API response]
```

**Stack trace:**
```
[relevant parts of stack trace]
```

**Steps to reproduce:**
1. [step]
2. [step]
3. Error occurs

**Relevant code:**
```typescript  // or ```python
[paste the function/component where error occurs]
```

Diagnose and fix this issue.
```

## Frontend Example (Browser Console Error)

```
Runtime error when clicking item card.

**Error message:**
```
TypeError: Cannot read properties of undefined (reading 'name')
    at ItemCard.tsx:34
```

**Stack trace:**
```
at ItemCard (ItemCard.tsx:34)
at renderWithHooks (react-dom.development.js:14985)
at onClick handler
```

**Steps to reproduce:**
1. Open list view
2. Wait for items to load
3. Click on first item card
4. Error occurs

**Relevant code:**
```typescript
function ItemCard({ item }: ItemCardProps) {
    const handleClick = () => {
        console.log(item.details.name)  // Error here
        onSelect(item)
    }
    return <div onClick={handleClick}>...</div>
}
```

Diagnose and fix this issue.
```

## Backend Example (API 500 Error)

```
Runtime error when calling /api/items.

**Error message:**
```json
{
  "detail": "Internal Server Error"
}
```

**Backend logs:**
```
ERROR: Exception in ASGI application
Traceback (most recent call last):
  File "app/services/calculator.py", line 45, in calculate_value
    result = numerator / denominator
ZeroDivisionError: float division by zero
```

**Steps to reproduce:**
1. Call GET /api/items?param=value
2. API returns 500

**Request parameters:**
- param: value

Diagnose and fix this issue.
```

## Why It Works

- **Error message** — Exact text helps identify the issue
- **Stack trace** — Shows where in code the error occurs
- **Steps to reproduce** — Helps understand the context
- **Relevant code** — Shows the actual implementation

## Common Frontend Runtime Errors

### Undefined Property Access
```
"Cannot read properties of undefined (reading 'X')"
→ Data not loaded yet, or optional field missing
→ Add optional chaining: data?.X
```

### React Hook Errors
```
"Rendered more hooks than during the previous render"
→ Hook called conditionally or in loop
→ Move hook before any early returns
```

### State Update Errors
```
"Can't perform a React state update on an unmounted component"
→ Async operation completing after unmount
→ Add cleanup in useEffect or check mounted status
```

## Common Backend Runtime Errors

### Database Errors
```
"sqlalchemy.exc.IntegrityError: duplicate key value"
→ Unique constraint violated
→ Check for existing record before insert
```

### Validation Errors
```
"pydantic.error_wrappers.ValidationError"
→ Request/response doesn't match schema
→ Check Pydantic model field types
```

### Calculation Errors
```
"ZeroDivisionError" or "ValueError: math domain error"
→ Edge case in calculations
→ Add input validation before math operations
```

## Debugging Checklist

### Frontend
- [ ] Check browser console for errors
- [ ] Check Network tab for failed requests
- [ ] Check React DevTools for component state
- [ ] Add console.log to trace data flow
- [ ] Verify data shape matches TypeScript types

### Backend
- [ ] Check terminal/Docker logs for stack trace
- [ ] Test endpoint with curl/Postman
- [ ] Add print statements to trace execution
- [ ] Verify request params match Pydantic schema
- [ ] Check database state if relevant
