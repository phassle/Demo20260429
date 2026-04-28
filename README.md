# Agentic Development Workshop — 29 April 2026

**Per Hassle · Monterro · Spark Vision**
*Your new colleague needs an onboarding.*

This README is the participant cheat-sheet. The full deck lives in `ws20260429-SparkVision-v1.md`; everything below is what you actually need *during* the workshop.

---

## Day plan

### Morning — the foundation

| Block | Focus |
|-------|-------|
| Intro + round the table | What you've tried so far |
| **Block 1 — Context is the foundation** | Desk · tokens = memory · context rot · attention |
| **Block 2 — AGENTS.md, the handbook** | ≤150 lines · stop rules · the 2-mistake rule |
| 🔨 **Hands-on 1** | Generate your AGENTS.md (15 min) |
| ☕ Break | |
| **Block 3 — The toolkit** | Skills · Hooks · Subagents · Commands · Connections |
| **Block 4 — The loop** | Plan → Build → Simplify → Verify |
| 🔨 **Hands-on 2** | Plan Mode with questions / options (15 min) |
| 🍝 Lunch — 60 min | |

### Afternoon — Spec-Driven Development with GitHub Spec Kit

`/specify` → `/clarify` → `/plan` → `/tasks` → `/implement` → ship.
One real `SV-` issue, end to end.

---

## Hands-on 1 — Generate your AGENTS.md (15 min)

> Every fenced block below is meant to be copy-pasted as-is. The file each block goes into is shown right above it.

### Step 1 — paste this prompt into your agent

> *Don't use `/init` — too generic.*

**→ Paste into Claude Code / Copilot chat / Codex:**

```text
Analyze this codebase and create an AGENTS.md file:
1. Keep it under 150 lines
2. Cover: WHAT (tech stack), WHY (purpose), HOW (commands)
3. Progressive Disclosure: index pointing to docs/ files
4. file:line references instead of code snippets
5. Assume linters handle code style
6. Always include these two lines:
   - Be extremely concise. Sacrifice grammar for concision.
   - At the end of each plan, list unresolved questions (if any).

Extract patterns into docs/architectural_patterns.md.
Finally: ln -s AGENTS.md CLAUDE.md
```

### Step 2 — review and sharpen

- ✂️ Remove generic filler (camelCase, "write tests")
- ➕ Add YOUR stop rules (rendering, asset bridge, migrations…)
- ➕ Add the two mandatory lines
- 🔗 `ln -s AGENTS.md CLAUDE.md`

### Step 3 — test it

- Give the agent a small task ("add a method to X")
- Did she follow the rules?
- Note where she didn't → that's a candidate for a new line

### AGENTS.md skeleton

**→ Save as `AGENTS.md` in the repo root, then `ln -s AGENTS.md CLAUDE.md`:**

````markdown
# AGENTS.md — Spark Vision · Sortiment

## Tech stack
- Backend: C# / .NET — solution in backend/
- 3D / viewer: Unity (C#) — under unity/
- Frontend (admin / configurator): React + TypeScript
- Repo: GitHub · Issues: GitHub Issues (SV-prefix)

## Commands
- Build: cd backend && dotnet build
- Test: cd backend && dotnet test
- Format: cd backend && dotnet format --verify-no-changes
- Frontend: cd frontend && npm run dev / npm run lint

## Stop rules
- Never modify the rendering pipeline / asset bridge without review
- Catalog imports run in dry-run mode by default
- Database migrations require review — never auto-apply
- Shared libraries require team sign-off
- If unsure: stop and ask

## Style
- Be extremely concise.
- At the end of each plan, list unresolved questions.
````

### Two layers of rules

**Soft layer — extend the `## Stop rules` section in `AGENTS.md`:**

````markdown
## Stop rules
- Never modify the rendering pipeline / asset bridge without review
- Database migrations require review — never auto-apply
- Catalog imports run in dry-run mode by default — never auto-publish
- Shared libraries / 3D primitives require team sign-off
- Never add npm dependencies without approval
- If unsure: stop and ask
````

**Hard layer — save as `.claude/settings.json`:**

```json
{
  "permissions": {
    "allow": ["Bash(dotnet *)", "Bash(npm *)", "Bash(git *)"],
    "deny":  ["Bash(rm -rf *)", "Bash(dotnet ef database update *)"]
  }
}
```

### What NOT to put in AGENTS.md

| DON'T write | DO write |
|-------------|----------|
| "Use camelCase" | "We prefix all API routes with /v2/" |
| "Write unit tests" | "We run `dotnet test` — minimum 80% coverage" |
| "Handle exceptions" | "All exceptions are logged via Serilog" |
| "Comment your code" | "We use XML doc comments on public APIs only" |

> *Generic = wasted tokens. Specific = competitive edge.*

### AGENTS.md across tools

| Tool | Native file |
|------|---|
| Claude Code | `CLAUDE.md` → `ln -s AGENTS.md CLAUDE.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| OpenAI Codex | `.codex/instructions.md` |
| Cursor | `.cursorrules` |
| Gemini CLI | `GEMINI.md` |
| Windsurf | `.windsurfrules` |

---

## Hands-on 2 — Plan Mode with questions (15 min)

Pick a small real issue from your backlog (or grab one from `SV-` issues).

**Step 1 — enter Plan Mode**

- Claude Code: `Shift + Tab` until you see "plan mode"
- OpenAI Codex: read-only tools only
- Copilot: switch to **Ask** mode

**Step 2 — describe + ask for questions**

**→ Paste into the agent (in Plan / Ask mode), with `[paste]` replaced by your task:**

```text
Here's the task: [paste].

Before you write the plan, ask me 3–5 questions about anything
you're unsure of. Then propose 2 alternative approaches with
trade-offs. End with unresolved questions.
```

**Step 3 — answer, choose, switch to Build.**

**Goal:** feel the difference between asking-first vs guessing-first.

---

## The 4-phase loop

```
   ┌──────────┐    ┌──────────┐    ┌────────────┐    ┌──────────┐
   │  PLAN    │───►│  BUILD   │───►│  SIMPLIFY  │───►│  VERIFY  │
   └──────────┘    └──────────┘    └────────────┘    └──────────┘
   read-only       small edits     refactor            tests +
   ask first       checkpoint      dedupe              human eyes
   list unknowns   often           remove dead         BDD passes
```

**One phase, one desk.** Clear or compact between phases.

### Plan — read-only, fresh desk

Plan output should always include:

- Files to read
- Files to change (with intent, not code)
- Tests to add
- **Unresolved questions** ← from your AGENTS.md

### Build — small, checkpointed

- Tight loops. Edit → test → review.
- Checkpoint every ~50 messages. `/context` to see the desk.
- Compact, don't clear, mid-build.
- If she goes off-script: stop, `/clear`, **resume from the plan**.

```
✗ Bad:  "go implement everything, ping me when done"
✓ Good: "implement step 1 of the plan. Run tests. Stop. Show me the diff."
```

### Simplify — the secret weapon

After build, before verify, ask:

**→ Paste into the agent:**

```text
Look at the changes you just made. Where can you:
- remove duplication?
- delete dead-code paths?
- inline trivial helpers?
- collapse adjacent if-statements?
Simplify without changing behavior. Show me the diff.
```

Typically catches **30%+ of unnecessary lines.**

### Verify — close the loop

| Check | What you ask for |
|-------|------------------|
| Tests | "Run the test suite. Paste the output." |
| Lint / format | Hook should already enforce — verify pass |
| Build | "Run the build. Show me green." |
| BDD scenarios | "Which Gherkin scenarios from the spec are now covered?" |
| Visual (Unity) | Screenshot before/after — eyeball or vision-model diff |
| Stop-rule areas | "Did you touch rendering / asset bridge / migrations?" |

> *She must say what she verified — not "I'm done."*

---

## The toolkit — five levers

| Lever | Loaded | Cost on her desk |
|---|---|---|
| **AGENTS.md** | Always | ~2–5K tokens, every session |
| **Skills** | On demand | ~80 tokens until triggered, then up to 8K |
| **Hooks** | Outside the LLM | **0 tokens** — runs in your shell |
| **Subagents** | New conversation | 0 on your desk; their desk fills |
| **Commands** | On invocation | Whatever the command expands to |

### Decision tree — which lever?

```
  Q: Should the agent know this?
   │
   ├─► Always, on every task?              ──► AGENTS.md
   │
   ├─► Only when the topic comes up?       ──► Skill
   │
   ├─► It must be enforced mechanically?   ──► Hook
   │   (formatting, blocking, injecting)
   │
   ├─► Need a second opinion / parallel?   ──► Subagent
   │
   └─► Same multi-step prompt, often?      ──► Command
```

### Linter hooks — invisible quality enforcement

**→ Merge into `.claude/settings.json` (alongside the `permissions` block above):**

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit|Write",
        "command": "if [[ $CLAUDE_FILE_PATHS == *.cs ]]; then dotnet format --include $CLAUDE_FILE_PATHS; fi" },
      { "matcher": "Edit|Write",
        "command": "if [[ $CLAUDE_FILE_PATHS =~ \\.(ts|tsx|js|jsx)$ ]]; then npx eslint --fix $CLAUDE_FILE_PATHS && npx prettier --write $CLAUDE_FILE_PATHS; fi" }
    ],
    "Stop": [
      { "command": "dotnet build --no-restore" }
    ]
  }
}
```

| Layer | Linter | Hook event |
|-------|--------|-----------|
| Format | `dotnet format` · Prettier · `ruff format` | every edit |
| Style / lint | ESLint · `ruff check` · `dotnet format --verify` | every edit |
| Types | `tsc --noEmit` · `dotnet build` · `mypy` | before "done" (Stop) |
| Tests | `dotnet test` · `vitest` · `pytest` | before "done" (Stop) |

### Connections layer

| Mechanism | When to use |
|---|---|
| **MCP server** | Long-lived integrations: GitHub, Slack, Linear, Figma, your DB |
| **CLI** | Fast, deterministic ops: `gh`, `dotnet`, `git`, custom `sv-*` scripts |
| **HTTP / API** | One-off integrations, internal services without an MCP server yet |

Spark Vision wishlist: GitHub (`gh` + MCP) · Unity asset bridge (CLI) · Salgar/catalog DB (custom MCP) · Figma (official MCP) · PDF catalogs (CLI + skill) · Slack/Teams (community MCP) · Sortiment DB (Postgres MCP, read-only).

---

## Afternoon — Spec Kit flow

```
   /constitution    ──►   project principles  (sister of AGENTS.md)
                                    │
                                    ▼
       /specify     ──►   what we're building   (specs/<feat>/spec.md)
                                    │
                                    ▼
       /clarify     ──►   ask remaining questions  (≈ grill-me)
                                    │
                                    ▼
        /plan       ──►   technical plan        (architecture, NFRs)
                                    │
                                    ▼
       /tasks       ──►   actionable, vertical-slice task list
                                    │
                                    ▼
     /implement     ──►   execute task-by-task with the agent
```

**Install — run in your shell:**

```bash
uvx --from git+https://github.com/github/spec-kit.git specify init <project>
```

| Command | Skills that augment it |
|---|---|
| `/constitution` | Reuses your morning AGENTS.md |
| `/specify` | `to-prd` · `domain-model` · `ubiquitous-language` |
| `/clarify` | `grill-me` |
| `/plan` | `zoom-out` · `improve-codebase-architecture` |
| `/tasks` | `to-issues` (HITL/AFK tracer-bullet slices) |
| `/implement` | `tdd` (red→green→refactor) |

> *Spec Kit is the spine. `mattpocock/skills` are the limbs. AGENTS.md is the constitution.*

### Skills library — install one at a time

**→ Run in your shell, in the repo root:**

```bash
npx skills@latest add mattpocock/skills/grill-me
npx skills@latest add mattpocock/skills/to-prd
npx skills@latest add mattpocock/skills/to-issues
npx skills@latest add mattpocock/skills/tdd
npx skills@latest add mattpocock/skills/qa
npx skills@latest add mattpocock/skills/triage-issue
npx skills@latest add mattpocock/skills/improve-codebase-architecture
npx skills@latest add mattpocock/skills/git-guardrails-claude-code
npx skills@latest add mattpocock/skills/write-a-skill
```

---

## Pre-ship checklist

**→ Print or paste at the top of your PR description:**

```text
[ ] All Gherkin scenarios have a passing test
[ ] Lint clean        (hook should already enforce)
[ ] Build green       (hook should already enforce)
[ ] /sv-pr-review subagent: 0 critical findings
[ ] Visual diff (Unity): screenshot reviewed
[ ] Stop-rule areas: untouched, OR explicitly approved
[ ] Feature flag in place (default off)
[ ] PRD success metric is measurable post-ship
[ ] Manual smoke: 1 happy path + 1 edge case
```

If anything is `[ ]` — **she does not declare done.**

---

## What you take home — top 5

1. **AGENTS.md ≤ 150 lines.** Symlink for every tool you use. Add the two mandatory lines.
2. **Plan Mode → ask first.** No code until questions are answered.
3. **The loop:** Plan → Build → Simplify → Verify. Every task. Every time.
4. **One lever per problem:** AGENTS.md / Skill / Hook / Subagent / Command. Don't mix.
5. **BDD before TDD before code.** Scenarios are the contract.

> *If you only do (1) and (2): you're already shipping 4× more.*

---

## Resources

- **AGENTS.md spec** — agents.md
- **GitHub Spec Kit (SDD)** — github.com/github/spec-kit (Apache-2.0)
  - Install: `uvx --from git+https://github.com/github/spec-kit.git specify init`
  - Slash commands: `/constitution` · `/specify` · `/clarify` · `/plan` · `/tasks` · `/implement`
- **Skills library — `mattpocock/skills`** — github.com/mattpocock/skills (Apache-2.0)
  - Install per skill: `npx skills@latest add mattpocock/skills/<name>`
- **Claude Code docs** — docs.claude.com
- **OpenAI Agents SDK** — platform.openai.com/docs/guides/agents
- **GitHub Copilot — agent mode + prompt files** — docs.github.com/copilot
- **Red Hat 4× study** — developers.redhat.com (Apr 2026)
- **Chroma context rot research** — research.trychroma.com/context-rot
- **Cucumber / BDD** — cucumber.io

Slack `#ai-team` for follow-ups. Per is on Teams the rest of the week.

---

*Per Hassle · per.hassle@monterro.com · +46 703 93 93 33*
