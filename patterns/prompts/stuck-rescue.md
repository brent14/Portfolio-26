# Stuck Rescue Prompt
**Use when:** Current approach isn't working, spinning wheels, 2+ failed attempts

## The Prompt

```
STOP. The current approach isn't working.

I've tried [N] times to [what you're trying to do] and it keeps [failing how].

Before writing any more code, answer these questions:

1. **Simplest version:** What's the absolute minimum that could work?
   (No abstractions, no edge cases, just the happy path)

2. **Bad assumption:** What assumption might be wrong?
   List 3 assumptions we're relying on.

3. **Framework gotcha:** Is there a React/TypeScript/framework quirk we're hitting?
   (Async, state management, CORS, caching, etc.)

4. **Different angle:** How would someone solve this without our current code?
   Fresh approach, ignoring what we've built.

5. **Skip it:** What if we just... didn't do this part?
   Is this actually necessary for the feature to work?

Don't write code. Just answer these questions clearly.
```

## Example

```
STOP. The current approach isn't working.

I've tried 3 times to get React Query to refetch the data and it keeps showing stale values.

Before writing any more code, answer these questions:

1. **Simplest version:** What's the absolute minimum that could work?
2. **Bad assumption:** What assumption might be wrong?
3. **Framework gotcha:** Is there a React/TypeScript quirk we're hitting?
4. **Different angle:** How would someone solve this without our current code?
5. **Skip it:** What if we just... didn't do this part?

Don't write code. Just answer these questions clearly.
```

## Why It Works

- **Forced pause** breaks the "try again harder" loop
- **Numbered questions** require actual thought
- **Framework gotcha** specifically surfaces platform-level issues
- **"Don't write code"** prevents Claude from immediately jumping back in
- **Question 5** often reveals the hard part isn't actually needed

## When to Use

- You've tried the same approach twice and it's not working
- Claude's code is getting longer/more complex with each iteration
- You feel "almost there" but keep hitting new issues
- Task is taking 2x+ the estimated time

## Follow-Up

After Claude answers, pick ONE path:
1. **Simplify** → "OK, let's just build [simplest version] first"
2. **Restart** → "Let's try [different angle] instead"
3. **Investigate** → "Let's check if [gotcha] is the issue"
4. **Punt** → "Let's skip this for now and continue with [next task]"

## Common Web Gotchas Claude Will Surface

- React Query staleTime/cacheTime misconfigured
- useEffect dependency array issues (stale closures)
- CORS not configured in backend
- Async/await missing or misused
- TypeScript types not matching API response shape
- State updates not triggering re-renders (mutation vs new object)
- Environment variables not prefixed with VITE_ (Vite apps)
- Database connection pool exhaustion
- Event handlers capturing stale state via closure
