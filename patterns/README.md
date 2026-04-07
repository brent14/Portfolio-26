# Pattern Library

Reusable prompts for web development with Claude Code (React/TypeScript + FastAPI/Python).

## Quick Find

**By situation:**
| Situation | Use This |
|-----------|----------|
| Starting new task | `tdd-task.md` |
| Continuing mid-session | `context-refresh.md` |
| New day, same feature | `warm-start.md` |
| Build/type error | `debug-build-error.md` |
| Runtime error | `debug-crash.md` |
| Approach failing | `stuck-rescue.md` |
| Ready to commit | `commit-message.md` |

---

## Prompts

### Task Management
| Prompt | Use When |
|--------|----------|
| `tdd-task.md` | Starting any new implementation task |
| `context-refresh.md` | Context >80% or Claude seems confused |
| `warm-start.md` | Resuming after time away (hours/days) |
| `stuck-rescue.md` | Tried same approach twice, still failing |
| `commit-message.md` | Ready to commit working code |

### Debugging
| Prompt | Use When |
|--------|----------|
| `debug-build-error.md` | TypeScript/Python build fails |
| `debug-crash.md` | Runtime error in browser or API |

---

## Templates

| Template | Use When |
|----------|----------|
| `PROJECT-TEMPLATE.md` | Starting any new feature |

---

## Effective Collaboration

1. **Paste exact errors** — Include file, line, message
2. **Describe visuals** — "Grid overflows right edge" vs "looks wrong"
3. **Report API responses** — Status codes, response bodies, backend logs
4. **Test incrementally** — Build after each change, report immediately
5. **Use DevTools** — Console errors, Network tab, React DevTools

---

## Anti-Patterns

| Don't Do | Why | Instead |
|----------|-----|---------|
| "Fix all the errors" | Scope creep | One error at a time |
| "Make the UI better" | Too vague | Specific: "Add loading skeleton to table" |
| "It doesn't work" | No actionable info | Describe what happens vs. expected |
| Ask Claude to estimate time | Inaccurate | Track your own actuals |
| Long code dumps without context | Gets lost | Relevant snippet + file name |

---

## Adding New Patterns

After a successful technique, add it here:

```markdown
# patterns/prompts/[name].md
**Use when:** [situation]

## The Prompt
[actual prompt text]

## Why It Works
[brief explanation]

## Example
[optional: real usage example]
```
