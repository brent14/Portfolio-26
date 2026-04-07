# Warm Start Prompt
**Use when:** Starting a new session after time away (hours/days), picking up existing feature

## The Prompt

```
Resuming work on [FEATURE NAME] after [TIME AWAY].

Read these files to get up to speed:
1. PROJECT.md — current feature context
2. CLAUDE.md — project conventions
3. [Specific files we were working on]

Then tell me:
- What's the current state? (what works, what doesn't)
- What was I working on last?
- What's the logical next step?
- Any concerns or blockers you see?

Don't start coding yet. Just orient me.
```

## Example

```
Resuming work on [My Feature] after 2 days away.

Read these files to get up to speed:
1. PROJECT.md — current feature context
2. CLAUDE.md — project conventions
3. backend/app/services/[relevant-service].py
4. frontend/src/components/[RelevantComponent]/index.tsx

Then tell me:
- What's the current state?
- What was I working on last?
- What's the logical next step?
- Any concerns or blockers you see?

Don't start coding yet. Just orient me.
```

## Why It Works

- **Explicit file list** ensures Claude reads the right context
- **"Don't start coding"** prevents premature implementation
- **State summary** catches you up without re-reading everything
- **"Concerns or blockers"** surfaces issues you might have forgotten

## When to Use

- First session after sleeping on it (next day)
- Returning after a weekend or longer break
- Switching between multiple projects
- When you can't remember where you left off

## Difference from Context Refresh

| Warm Start | Context Refresh |
|------------|-----------------|
| New session, stale memory | Mid-session, context limit |
| Need to re-orient | Know where you are |
| Claude reads your files | You provide summary |
| "What's the state?" | "Continue with X" |

## Follow-Up After Orientation

- **Continue:** "Great, let's continue with [next step]"
- **Review first:** "Before continuing, show me [specific file]"
- **Clarify:** "What did you mean by [concern]?"
- **Pivot:** "Actually, let's work on [different task] first"
