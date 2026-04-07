# DEBUGGING.md — Issue Reporting Guide

Use these templates when something breaks. The goal: give Claude exactly what it needs to diagnose and fix the issue in one pass.

---

## Quick Reference

| Symptom | Template to Use |
|---------|----------------|
| TypeScript/Python won't compile | [Build Error](#build-error) |
| App crashes at runtime | [Runtime Error](#runtime-error) |
| API returns wrong data or error | [API Error](#api-error) |
| UI looks wrong | [Visual Bug](#visual-bug) |
| Tests failing | [Test Failure](#test-failure) |
| Same fix keeps breaking | [Stuck Loop](#stuck-loop) |

---

## Build Error

```
Build error in [FILE] line [N]:

"[EXACT ERROR MESSAGE]"

Code around that line:
```typescript  // or ```python
[paste ~10 lines of context around the error]
```

Related context:
- [Any relevant imports or type definitions]
- [What this code is trying to do]

Fix this error.
```

### Common TypeScript Errors

| Error | Likely Cause |
|-------|-------------|
| `Property 'X' does not exist on type 'Y'` | Interface missing field, check `types/index.ts` |
| `Type 'X \| undefined' is not assignable to type 'X'` | Add nullish coalescing or optional chaining |
| `Cannot find module '@/X'` | Check tsconfig paths, or use relative import |
| `Object is possibly 'undefined'` | Add null check before accessing properties |

### Common Python/FastAPI Errors

| Error | Likely Cause |
|-------|-------------|
| `ImportError: cannot import name 'X'` | Check exports, possible circular import |
| `pydantic.ValidationError` | Request/response doesn't match schema |
| `AttributeError: 'NoneType' has no attribute` | Missing null check before using result |

---

## Runtime Error

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

### Common Frontend Runtime Errors

| Error | Likely Cause |
|-------|-------------|
| `Cannot read properties of undefined (reading 'X')` | Data not loaded yet, add optional chaining |
| `Rendered more hooks than during the previous render` | Hook called conditionally, move before early returns |
| `Can't perform state update on unmounted component` | Add cleanup in useEffect |

### Common Backend Runtime Errors

| Error | Likely Cause |
|-------|-------------|
| `sqlalchemy.exc.IntegrityError: duplicate key` | Unique constraint violated, check before insert |
| `ZeroDivisionError` | Edge case in calculation, add input validation |
| `asyncio.TimeoutError` | External API slow, add timeout handling |

---

## API Error

```
API call failing to [ENDPOINT].

Status: [500/404/422/etc]
Response body:
[paste JSON or error message]

Request parameters:
[paste request details]

Backend logs:
[paste relevant backend terminal output: docker-compose logs -f backend]

Steps to reproduce:
1. [what triggered the call]
2. [expected behavior]
3. [what actually happened]
```

---

## Visual Bug

```
UI looks wrong on [PAGE/COMPONENT].

Expected: [describe what it should look like]
Actual: [describe what you see]

Screenshot: [attach if possible]

Recent changes: [what was changed before this appeared]
```

**Before reporting:**
- Check browser console for JavaScript errors
- Check Network tab for failed requests
- Try hard refresh (Cmd+Shift+R)

---

## Test Failure

```
Test failing: [TEST NAME]

Error:
[paste exact test failure output]

Test code:
```typescript
[paste the failing test]
```

The code being tested:
```typescript
[paste the function/component under test]
```
```

---

## Stuck Loop

Use when the same fix keeps breaking or Claude's code is getting more complex with each attempt.

```
STOP. The current approach isn't working.

I've tried [N] times to [what you're trying to do] and it keeps [failing how].

Before writing any more code, answer:
1. What's the simplest version that could work?
2. What assumption might be wrong?
3. Is there a framework quirk we're hitting? (async, state, CORS, etc.)
4. How would someone solve this fresh, without our current code?
5. What if we just skipped this part — is it actually necessary?

Don't write code. Just answer these questions.
```

---

## Debugging Checklist

### Frontend
- [ ] Check browser console (F12) for errors
- [ ] Check Network tab for failed API requests
- [ ] Check React DevTools for component state
- [ ] Verify data shape matches TypeScript types
- [ ] Try hard refresh to clear cached state

### Backend
- [ ] Check terminal / Docker logs for stack trace
- [ ] Test endpoint with curl or Postman
- [ ] Verify request params match Pydantic schema
- [ ] Check database state if relevant
- [ ] Look for async/await missing or misused

### E2E / Playwright
- [ ] Run headed mode: `npm run test:e2e:headed`
- [ ] Check `e2e/known-errors.ts` for expected errors
- [ ] Increase wait times if test is flaky
- [ ] Take a screenshot at the failure point

---

## Reporting Results to Claude

### It worked
```
✅ That worked. [Brief description of what you tested]
Let's continue with [next thing].
```

### Runs but broken
```
Runs but doesn't work right.

What I tested: [what you did]
Expected: [what should happen]
Actual: [what happened]
Console output / API response: [paste relevant output]
```

### Build failed
```
Build error in [File.tsx/py] line [N]:

"[exact error message]"

Code around that line:
```typescript/python
[paste the relevant code]
```
```
