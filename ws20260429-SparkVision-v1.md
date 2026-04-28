<!-- ============================================================ -->
<!-- PRESENTATION DOCTRINE — read before exporting to .pptx           -->
<!-- ============================================================ -->
<!--
Density rules followed in this deck:
  • Max ~6 visible chunks per slide (bullet, row, code block, callout)
  • Code blocks > 15 lines should build progressively, not appear at once
  • Tables > 6 rows should reveal row-by-row, or split across slides
  • Tone: one Big Idea per slide. Numbers/code/quote support it — never
    compete with it.

Animation legend (look for `<!-- ANIMATE: ... -->` inside slides):
  • build-bullets        reveal bullets one click at a time
  • build-rows           reveal table rows top → bottom on click
  • build-code           reveal code block in chunks (delimiter: blank line)
  • build-columns        reveal columns left → right
  • emphasis-callout     fade in last; pulse highlight on entry
  • split-into-N         split content across N slides instead of animating

Slide "headline" (the H1) always appears immediately, no animation.
Speaker-notes show timing + intent; slides themselves carry no clock times.
-->

<!-- SLIDE: TITLE — dark navy bg, big title, subtitle, author -->
# Agentic Development Workshop
## Your new colleague needs an onboarding
Per Hassle · Monterro · April 29, 2026

<!-- SPEAKER NOTES:
- Full day. Morning = the foundation (context, AGENTS.md, toolbox, workflow). Afternoon = the full pipeline from idea to PR.
- Frame for the whole day: the agent IS a new colleague. Everything we do is onboarding and process.
-->

---

<!-- SLIDE: AGENDA — light bg, table -->
# Today's agenda — morning

| Block | Focus |
|-------|-------|
| Intro + round the table | What you've tried so far |
| **Block 1 — Context is the foundation** | Desk · tokens = memory · context rot · attention |
| **Block 2 — AGENTS.md, the handbook** | Max 150 lines · stop rules · the 2-mistake rule |
| **🔨 Hands-on 1** | Generate your AGENTS.md (15 min) |
| ☕ Break | |
| **Block 3 — The toolkit** | Skills · Hooks · Subagents · Commands |
| **Block 4 — The loop** | Plan → Build → Simplify → Verify |
| **🔨 Hands-on 2** | Plan Mode with questions / options |

*Afternoon: Spec-Driven Development with **GitHub Spec Kit** — `/specify` → `/clarify` → `/plan` → `/tasks` → `/implement` → ship.*

<!-- SPEAKER NOTES:
- Show that morning builds the foundation. Afternoon runs everything for real on a real issue.
- Demo slides (🔴) = I run live before each hands-on. Hands-on (🔨) = you do it.
-->

---

<!-- SLIDE: CONTENT — light bg -->
# Welcome

Per Hassle — Monterro

AI & agentic development across portfolio companies

<!-- SPEAKER NOTES:
- Brief intro to yourself and Monterro's AI Team. No sales pitch — focus on the day.
- Say: "I've run this format with several teams. Everything you hear today is based on what actually works in production in 2026."
-->

---

<!-- SLIDE: QUESTION — light bg, red ❓ icon -->
# ❓ Round the table

- Who are you? What do you build?
- Which AI tools have you used? (Copilot? Claude? ChatGPT?)
- Chat-style or agentic?
- One sentence: what worked, what didn't.

<!-- SPEAKER NOTES:
- Max 1 min per person. Calibrates the pace for the day.
- Listen for: who's in agent mode vs chat? Where does trust break down?
- "Chat-style or agentic?" is the key question. Most people use Copilot as chat. Today we shift to agent mode.
-->

---

<!-- ============================================================ -->
<!-- BLOCK 1: CONTEXT IS THE FOUNDATION                            -->
<!-- ============================================================ -->

<!-- SLIDE: SECTION — dark navy bg -->
# Block 1
## Context is the foundation
*Tokens = memory. Attention is the bottleneck.*

<!-- SPEAKER NOTES:
- Time: 09:15–09:40
-->

---

<!-- SLIDE: CONTENT -->
# You've hired a new developer

She's not a chatbot. She's **a new colleague.**

The best one you'll ever hire:
- Reads code 200× faster than you
- Doesn't get tired, doesn't get bored
- Costs ~1.4% of a senior salary
- Available 24/7

But on day 1 she knows **nothing** about:
- your architecture
- your conventions
- your domain language
- where the boundaries are

**Without onboarding she guesses. With onboarding she delivers.**

<!-- SPEAKER NOTES:
- Plant the metaphor immediately. The whole day rests on it.
- "Best colleague you can hire" isn't hype — Stripe Minions ship 1,300 PRs/week, which we'll look at later.
- But: without context = guesses. With context = delivers. That's the whole workshop.
-->

---

<!-- SLIDE: CONTENT -->
# The 1.4 % math — what does she actually cost?

<!-- ANIMATE: build-code (human cost first), build-code (agent cost second), build-rows (comparison), emphasis-callout last -->

A senior developer in the Nordics, fully loaded (salary + benefits + tools + office):

```
   Senior dev, fully loaded     ≈  150 000 USD / year
   Working hours / year         ≈  1 800 h
   Cost per hour                ≈  85 USD / h
   Cost per minute              ≈  1.40 USD / min
```

A heavy agentic day (Claude Sonnet 4.6, generous estimates):

```
   ~2 M input tokens   @ $3 / M tok     =  $6
   ~400 K output tokens @ $15 / M tok   =  $6
   ────────────────────────────────────
   Per dev, per day                     ≈  $12 – 20
   Per dev, per year                    ≈  $2 000 – 4 000
   = 1.3 – 2.7 % of fully loaded salary
```

| Comparison | Cost |
|---|---|
| 1 senior dev, 1 hour | **~$85** |
| 1 dev + agent, 1 heavy day | **~$15** |
| 10 devs + agents, 1 year | **~$25 000 – 40 000** |
| 1 senior dev hire, 1 year | **~$150 000** |

> **The model is the cheapest line in your engineering budget.**
> **The harness around her is where the 4× actually comes from.**

<!-- SPEAKER NOTES:
- Numbers are rough but defensible. Adjust for SV's actual rates if you know them.
- The point isn't precision — it's order of magnitude. Tokens cost 1-2% of the human's cost. Model price is a non-issue.
- That's why "we'll wait for prices to come down" is the wrong objection — they're already negligible.
- The expensive thing is NOT setting up the harness. Every day without AGENTS.md / hooks / skills, you're paying senior salaries for work the agent could do for $15.
- Tie back to Block 1's thesis: "harness > model". The cost slide proves it economically.
-->

---

<!-- SLIDE: CONTENT -->
# Agent = Model + Harness

Mitchell Hashimoto (HashiCorp), formalized by Fowler & OpenAI in 2026:

> **Agent = Model + Harness**

- **Model** = her brain. Claude, GPT-5, Gemini. Increasingly **commoditized.**
- **Harness** = her workplace. Onboarding docs, policies, tools, sandboxes, the team around her.

**88% of AI agent projects that fail, fail at the harness level — not the model level.**

Today is about the harness.

<!-- SPEAKER NOTES:
- Hashimoto introduced the term, Fowler made it canonical (April 2026).
- Say this slowly: "The model is commodity. The harness is the competitive edge."
- This frames why the whole day is about AGENTS.md, hooks, skills, subagents — NOT about which model is "best".
- Source: Atlan, NxCode, Miraflow (2026).
-->

---

<!-- SLIDE: CONTENT -->
# Her desk — the context window

Everything she works with sits on her **desk.** When it's full, things fall off.

```
┌─────────────────────────────────────────┐
│  CONTEXT WINDOW (200K – 1M tokens)      │
│                                         │
│  🔧 System message        ~5–10K        │
│  📋 AGENTS.md             ~2–5K         │
│  💬 Your conversation      grows →      │
│  📖 Files she's read      ~1–5K/file    │
│  ▶️  Tool results          varies       │
│                                         │
│  ← Full? Oldest context is forgotten.   │
└─────────────────────────────────────────┘
```

**Tokens are memory.** Each A4 page on her desk ≈ 500 tokens.

<!-- SPEAKER NOTES:
- 200K tokens ≈ 500 pages of code. Sounds like a lot — fills up faster than you think.
- Everything sits on the desk simultaneously: instructions, conversation, files she's read, test output she's run.
- A4 analogy: imagine the desk is covered in paper. She can only hold so many sheets at once.
- Full? Oldest sheets fall off — she forgets what you talked about 50 sheets ago.
-->

---

<!-- SLIDE: CONTENT -->
# Context windows today (April 2026)

| Model / Tool | Window |
|---|---|
| **Claude Opus 4.6 / 4.7** | 1M (GA) |
| **Claude Sonnet 4.6** | 200K (1M extended) |
| **GPT-5.5** | 1M |
| **Gemini 2.5 Pro** | 1M (2M coming) |
| **GitHub Copilot** | 192K |
| **Cursor** | 120–200K |

Bigger desk ≠ no need for order.

> **The patterns for keeping it clean are the same.**

<!-- SPEAKER NOTES:
- All major models are around 1M now. But: unreliable long before they're full (next slide).
- The patterns — /context, /clear, /compact, progressive disclosure — apply regardless of window size.
-->

---

<!-- SLIDE: CONTENT -->
# Context rot — the science

<!-- ANIMATE: build-bullets (the three mechanisms reveal one at a time), emphasis-callout last -->

Chroma Research, 2025: **18 frontier models tested. Every single one degrades** as context fills.

Three mechanisms:

1. **Attention dilution** — softmax attention spreads weight across all tokens. More tokens = each gets less. Signal stays the same; noise floor rises.
2. **Distractor interference** — semantically similar but irrelevant content actively misleads.
3. **Constraint burial** — your "stop rules" sink to the bottom. Agent picks worse and worse tools.

> **Models claiming 200K become unreliable around 130K.**
> **65% of enterprise AI failures in 2025: context drift / memory loss in multi-step reasoning.**

<!-- SPEAKER NOTES:
- This isn't opinion — it's published research (Chroma, MindStudio, Understanding AI).
- Say: "You've probably seen the agent 'forget' what you said earlier in a long conversation. That isn't random — it's measurable."
- The 65% number comes from Forrester via multiple 2025 reports.
- Source: research.trychroma.com/context-rot
-->

---

<!-- SLIDE: CONTENT -->
# "Attention is all you need" — and attention is the bottleneck

<!-- ANIMATE: build-code (each line of n² scaling reveals on click) -->

The 2017 paper that started everything (*Vaswani et al.*) tied LLM quality to one mechanism: **attention.**

For *n* tokens, the model computes **n² pairwise relationships.**

```
   1K tokens →     1M comparisons       (easy)
  10K tokens →   100M comparisons       (fine)
 100K tokens →    10B comparisons       (slowing)
   1M tokens →     1T comparisons       (cost + drift)
```

More tokens isn't free. **Attention quality scales sub-linearly with context size.**

> The bigger the desk, the harder it is for her to see what matters on it.

<!-- SPEAKER NOTES:
- "Attention is all you need" is *the* transformer paper (2017). Worth name-dropping.
- n² is why 1M-context models are more expensive per token than 200K.
- It's not just cost — quality drops too. "More context" isn't always better. Often worse.
- This motivates progressive disclosure (Block 3).
-->

---

<!-- SLIDE: CONTENT -->
# Keep the desk clean

<!-- ANIMATE: build-rows -->

| Command | What it does |
|---------|-------------|
| **Status bar** | Always visible — context usage in real time |
| `/context` | Detailed breakdown of what's on the desk |
| `/clear` | Clear the conversation (new desk) |
| `/compact` | Summarize history, keep going (less aggressive than /clear) |
| `claude -c` | Resume the most recent conversation |
| `Esc + Esc` | Undo the last action |

**Rule of thumb:** `/clear` between phases. `/compact` when you want continuity but the desk is getting messy.

<!-- SPEAKER NOTES:
- Show /context live later — most people have never opened it.
- /clear is more aggressive than /compact. /compact keeps a summary.
- "Phases" is introduced here to set up Block 4 (Plan → Build → Simplify → Verify).
-->

---

<!-- SLIDE: CONTENT -->
# Why this matters before anything else

Everything we do today — AGENTS.md, hooks, skills, subagents, Plan Mode — is **one answer to one question:**

> **How do I keep her context clean and high-signal?**

- **AGENTS.md** = the always-loaded brief. Keep it ≤150 lines so it doesn't crowd the desk.
- **Skills** = pulled in only when needed. ~80 tokens of description vs 8K body.
- **Subagents** = own desk, return summary. Your desk stays clean.
- **Hooks** = run outside the LLM. Zero tokens.
- **Plan Mode** = read-only fresh desk, then a clean handoff to Build.

If you remember nothing else from today: **context is the bottleneck.**

<!-- SPEAKER NOTES:
- This is the through-line — bind the whole day together in one slide.
- Every tool we show today is one answer to the same question: how do I keep her desk clean and high-signal?
- Come back to this slide whenever someone asks "why so much complexity with four different files?".
-->

---

<!-- ============================================================ -->
<!-- BLOCK 2: AGENTS.MD — THE HANDBOOK                             -->
<!-- ============================================================ -->

<!-- SLIDE: SECTION — dark navy bg -->
# Block 2
## AGENTS.md — the handbook
*The single most important file in your project.*

<!-- SPEAKER NOTES:
- Time: 09:40–10:15
-->

---

<!-- SLIDE: CONTENT -->
# Without onboarding

<!-- ANIMATE: build-code (each ✗ line reveals on click; final 'She means well' fades in) -->

```
You: "Add a new endpoint to fetch products by category"

Agent:
  ✗ Guesses file structure
  ✗ Invents naming conventions
  ✗ Misses your test patterns
  ✗ Touches files that should never be touched
  ✗ Creates a PR nobody wants to review
  ✗ Burns tokens on wrong attempts
```

She means well. She just doesn't know.

<!-- SPEAKER NOTES:
- Generic example — fetch products by category. Works for any stack.
- "Burns tokens" is concrete: a task that should take 10K can balloon to 50K+ when she guesses wrong and has to backtrack.
-->

---

<!-- SLIDE: CONTENT -->
# With onboarding (15 lines of AGENTS.md)

<!-- ANIMATE: build-code (each ✓ line reveals on click; final 'Same agent…' callout fades in) -->

```
You: "Add a new endpoint to fetch products by category"

Agent:
  ✓ Reads AGENTS.md → knows where endpoints live
  ✓ Follows your naming patterns
  ✓ Speaks your ubiquitous language (DDD)  ← "Sortiment" not "Inventory",
                                              "Catalog" not "ProductList"
  ✓ Respects your bounded contexts         ← Sortiment ≠ Showroom ≠ Blueprint
  ✓ Writes tests in the right style
  ✓ Stops at the boundaries you defined
  ✓ Runs lint + tests before flagging "done"
```

**Same agent. Same prompt. Completely different result.**

<!-- SPEAKER NOTES:
- Say it again: same model, same prompt — 15 lines of text make the difference.
- That's why AGENTS.md is today's single most important file.
- DDD callout: Domain-Driven Design (Eric Evans, 2003) is what you encode in AGENTS.md whether you call it that or not. Two concepts to teach the agent:
  - **Ubiquitous language** — every domain term has ONE canonical name. "Sortiment" not "Inventory" + "Catalog" + "ProductList".
  - **Bounded context** — different parts of the system speak different dialects. SV's Sortiment, Showroom, Blueprint = three contexts, three vocabularies. The agent must know which context she's in.
- The `ubiquitous-language` skill (mattpocock/skills, Block 5) extracts this glossary into UBIQUITOUS_LANGUAGE.md, which AGENTS.md references.
-->

---

<!-- SLIDE: CONTENT -->
# Red Hat — the data

Red Hat added a ~200-line AGENTS.md to one of their repos:

| Metric | Before | After |
|---|---|---|
| Commits/month from agentic flow | 12 | **53** |
| Improvement | — | **4.4×** |

That's one markdown file. Checked into git. Read by every agent on every session.

<!-- SPEAKER NOTES:
- Red Hat published this in April 2026 (developers.redhat.com).
- Hard data — not vibes.
- 12 → 53 isn't "a bit better" — it's the same developers shipping 4× the code through the agent.
-->

---

<!-- SLIDE: CONTENT -->
# What is AGENTS.md?

**Max 150 lines. A human should read it in 60 seconds.**

| Question | Content |
|----------|---------|
| What does the project do? | One sentence |
| How do I start / test / lint? | Exact commands |
| Where does the code live? | Folder structure (file:line refs, not snippets) |
| **How do we work with Git?** | **Branching, commit conventions** |
| Common mistakes? | What new devs always get wrong |
| When should I stop? | Stop rules (next slide) |

<!-- SPEAKER NOTES:
- 150 lines isn't arbitrary — Anthropic recommends ≤60, but 150 works well in practice for B2B teams. Longer = humans stop reading it AND it starts drowning in context.
- "60 seconds to scan" is the acceptance criterion. If a new developer can't scan it in 60 sec, it's too long.
- file:line refs > code snippets. Snippets go stale; line refs update automatically.
-->

---

<!-- SLIDE: CONTENT -->
# Stop rules — tell her where the boundary is

<!-- ANIMATE: build-code (AGENTS.md block first, settings.json second) -->

**Two layers:** what she should avoid (AGENTS.md) + what she's allowed to run (.claude/settings.json).

```markdown
## Stop rules  (in AGENTS.md)
- Never modify the rendering pipeline / asset bridge without review
- Database migrations require review — never auto-apply
- Catalog imports run in dry-run mode by default — never auto-publish
- Shared libraries / 3D primitives require team sign-off
- Never add npm dependencies without approval
- If unsure: stop and ask
```

```json
// .claude/settings.json — tool permissions (hard layer)
{
  "permissions": {
    "allow": ["Bash(dotnet *)", "Bash(npm *)", "Bash(git *)"],
    "deny":  ["Bash(rm -rf *)", "Bash(dotnet ef database update *)"]
  }
}
```

<!-- SPEAKER NOTES:
- Two layers. AGENTS.md = soft rules ("don't touch X without asking") — she respects them but it's judgment.
- settings.json = hard permissions — she can't even try to run it.
- Concrete sensitive areas to consider: rendering pipeline, Unity asset bridge, catalog import, DB migrations. Add as needed.
- "If unsure: stop and ask" is the key rule — combined with the "unresolved questions" line later it becomes very powerful.
-->

---

<!-- SLIDE: CONTENT -->
# What should NOT be in AGENTS.md?

The LLM is the **brain.** She already knows how to code.

Only tell her what's **unique to your project:**

| DON'T write | DO write |
|-------------|----------|
| "Use camelCase" | "We prefix all API routes with /v2/" |
| "Write unit tests" | "We run `dotnet test` — minimum 80% coverage" |
| "Handle exceptions" | "All exceptions are logged via Serilog" |
| "Comment your code" | "We use XML doc comments on public APIs only" |

> Generic = wasted tokens. Specific = competitive edge.

<!-- SPEAKER NOTES:
- The LLM is the brain. You don't teach a senior colleague how to write camelCase.
- Generic rules steal space from what's actually specific to your project.
- Rule of thumb: if the rule applies to every C# project on Earth — skip it. If it applies to YOURS — write it.
-->

---

<!-- SLIDE: CONTENT -->
# Two lines that should always be there

```markdown
- Be extremely concise. Sacrifice grammar for concision.
- At the end of each plan, list unresolved questions (if any).
```

**"Be concise"** → plans become scannable. Less context burned.

**"Unresolved questions"** → she **tells you what she doesn't know** instead of guessing.

This single change might be the most powerful behavior shift you can make.

<!-- SPEAKER NOTES:
- Be concise: plans become scannable, not walls of text. Fewer tokens.
- Unresolved questions: the most powerful behavior shift. She stops and asks instead of assuming. Far fewer wrong-direction tasks.
- Ask the room: "How often does your agent guess? How often does it ask?" — bridges into adding these two lines.
-->

---

<!-- SLIDE: CONTENT -->
# AGENTS.md is a team document

- **Checked into git.** Everyone gets the same onboarding.
- **Reviewed every sprint** — like coding standards.
- **The 2-mistake rule:** same mistake twice → new line in AGENTS.md.
- **Per-folder hierarchy.** Nearest file wins (like .gitignore).

```
project/
├── AGENTS.md                ← Project-wide
├── backend/
│   └── AGENTS.md            ← Backend-specific rules
└── unity/
    └── AGENTS.md            ← Unity / 3D-specific rules
```

> **Onboarding documents grow organically — write rules from real mistakes, not theory.**

<!-- SPEAKER NOTES:
- Reviewed every sprint. As important as code review.
- 2-mistake rule: don't write everything up front. Let mistakes drive it. Third time she forgets X = new line.
- Hierarchy: backend and Unity have different rules. Nearest wins.
- Three products (Blueprint / Showroom / Sortiment) → three AGENTS.md files, optionally one shared at root.
-->

---

<!-- SLIDE: CONTENT -->
# AGENTS.md is the industry standard

<!-- ANIMATE: build-rows -->

| Tool | Reads AGENTS.md? | Native file |
|------|:-:|---|
| **Claude Code** | ✅ | `CLAUDE.md` → `ln -s AGENTS.md CLAUDE.md` |
| **GitHub Copilot** | ✅ | `.github/copilot-instructions.md` |
| **OpenAI Codex** | ✅ | `.codex/instructions.md` |
| **Cursor** | ✅ | `.cursorrules` |
| **Gemini CLI** | ✅ | `GEMINI.md` |
| **Windsurf** | ✅ | `.windsurfrules` |

> **One file. All agents.** AGENTS.md is the AAIF / Linux Foundation standard adopted across 60 000+ repos.

<!-- SPEAKER NOTES:
- Before 2025: every tool had its own file → switching tools = rewriting everything.
- Since 2025: AGENTS.md is industry standard. All major tools read it.
- Claude Code: symlink CLAUDE.md → AGENTS.md. No rules in two places.
- This means you're not locked into one tool. Switch from Copilot to Claude Code tomorrow — the onboarding comes with you.
-->

---

<!-- SLIDE: DEMO — light bg, red 🔴 dot -->
# 🔴 DEMO: Generate AGENTS.md — the right prompt

**Don't use `/init`** — too generic. Copy-paste this instead:

```
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

<!-- SPEAKER NOTES:
- Live demo: run the prompt against one of their repos (if I have access) or against the demo project.
- /init is too generic — it generates 200+ lines stuffed with generic coding rules.
- This prompt produces a focused AGENTS.md that matches your codebase.
- "file:line" instead of code snippets = updates automatically with the code.
- Last line: ln -s AGENTS.md CLAUDE.md → Claude Code reads it, no duplicates.
-->

---

<!-- SLIDE: CONTENT -->
# Example — AGENTS.md skeleton

```markdown
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
```

<!-- SPEAKER NOTES:
- Skeleton — fill in details during hands-on. One per product (Blueprint / Showroom / Sortiment), optionally a shared one at root.
- Adapt stop rules to your sensitive areas — rendering, asset bridge, catalog import, DB.
- Issue prefix SV- is a placeholder — adapt to your tracker.
-->

---

<!-- SLIDE: HANDS-ON — warm yellow bg -->
# 🔨 Hands-on 1 — Generate your AGENTS.md (15 min)

**Step 1 — copy-paste the prompt into Claude Code:**
*(see the demo slide — same prompt)*

**Step 2 — review and sharpen:**

- ✂️ Remove generic filler (camelCase, "write tests")
- ➕ Add YOUR stop rules (rendering, asset bridge, migrations)
- ➕ Add the two mandatory lines
- 🔗 `ln -s AGENTS.md CLAUDE.md`

**Step 3 — test it:**

- Give the agent a small task ("add a method to X")
- Did she follow the rules?
- Note where she didn't → that's a candidate for a new line

<!-- SPEAKER NOTES:
- 15 min = first version, not perfect. That's fine.
- Circulate — help anyone with a strange repo structure.
- The test in step 3 is the point: AGENTS.md isn't born finished — it grows out of mistakes.
- Closing nudge: "Take it home. Review with the team this week. Add 2-3 stop rules based on what you know she tends to get wrong."
-->

---

<!-- SLIDE: STEP -->
*☕ Break — 15 min*

---

<!-- ============================================================ -->
<!-- BLOCK 3: THE TOOLKIT                                          -->
<!-- ============================================================ -->

<!-- SLIDE: SECTION — dark navy bg -->
# Block 3
## The toolkit
*Skills · Hooks · Subagents · Commands*

<!-- SPEAKER NOTES:
- Time: 10:45–11:30
- Same through-line: every tool here is one answer to "how do I keep her desk clean?"
- We run it in Claude Code today, but every concept maps 1:1 to OpenAI Codex (Agents SDK) and GitHub Copilot. Show the mapping table on each slide so nobody feels locked in.
-->

---

<!-- SLIDE: CONTENT -->
# The four levers

<!-- ANIMATE: build-rows, emphasis-callout last -->

| Lever | Loaded | Cost on her desk |
|---|---|---|
| **AGENTS.md** | Always | ~2–5K tokens, every session |
| **Skills** | On demand | ~80 tokens until triggered, then up to 8K |
| **Hooks** | Outside the LLM | **0 tokens** — runs in your shell |
| **Subagents** | New conversation | 0 on your desk; their desk fills |
| **Commands** | On invocation | Whatever the command expands to |

> **Right tool, right moment.** Don't put a hook in AGENTS.md or a skill in a hook.

<!-- SPEAKER NOTES:
- This is the cheat sheet for the whole block. Come back to it after each lever.
- The cheapest tool is the one whose cost is "0 tokens" — hooks. Use them where you can.
- Skills are the second-cheapest because they only enter the desk when relevant.
-->

---

<!-- SLIDE: CONTENT -->
# Skills — pulled in only when needed

<!-- ANIMATE: build-code (folder structure first, SKILL.md second) -->

A **Skill** is a folder with a `SKILL.md`. The description is always loaded (~80 tokens). The body is loaded only when the topic matches.

```
.claude/skills/
└── sv-catalog-import/
    ├── SKILL.md            ← description + when to trigger
    └── reference/
        ├── salgar-format.md
        └── examples/...
```

**SKILL.md (description, ~80 tokens):**
> *Convert a PDF furniture catalog into Salgar JSON. Triggers on "import catalog", "PDF to Salgar", "convert catalog".*

When she sees those phrases, the body is loaded — schema, examples, edge cases. Otherwise: 0 cost.

<!-- SPEAKER NOTES:
- Concrete Spark Vision example — the catalog import is real, on Per's plate already (GitHub #128).
- Skills are how you encode tribal knowledge once and have it surface only when relevant.
- ~80 tokens vs 8K body is the key trick: progressive disclosure at the skill level.
-->

---

<!-- SLIDE: CONTENT -->
# Skills — across tools

| Tool | Mechanism | Where they live |
|------|-----------|-----------------|
| **Claude Code** | Skills (auto-loaded by description match) | `~/.claude/skills/` or repo `.claude/skills/` |
| **OpenAI Codex (Agents SDK)** | Specialized agents + function-calling tools | Defined in code via `Agent(...)` + `@function_tool` |
| **GitHub Copilot** | Prompt files / Custom instructions | `.github/prompts/*.prompt.md` + `.github/copilot-instructions.md` |
| **Cursor** | `.cursorrules` + custom modes | `.cursor/rules/*.mdc` |

Same idea everywhere: **describe the capability briefly, load the body lazily.**

<!-- SPEAKER NOTES:
- Codex Agents SDK: handoffs + tools = roughly the same shape. The agent declares it can do X via a tool description; the tool body only runs when called.
- Copilot prompt files (GA Apr 2026): scoped instructions per task, invoked with /prompt-name.
- Don't get hung up on syntax — the pattern is the point.
-->

---

<!-- SLIDE: CONTENT -->
# Hooks — deterministic, zero tokens

<!-- ANIMATE: build-code (PostToolUse block first, PreToolUse second), emphasis-callout last -->

A **Hook** is a shell command that fires on a lifecycle event. **It never talks to the LLM.**

```json
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit",
        "command": "dotnet format --include $CLAUDE_FILE_PATHS" },
      { "matcher": "Edit",
        "command": "dotnet test --filter $CLAUDE_TEST_HINT" }
    ],
    "PreToolUse": [
      { "matcher": "Bash(dotnet ef *)",
        "command": "echo 'Migration detected — needs review'; exit 1" }
    ]
  }
}
```

Format on save. Block migrations. Inject git branch into every prompt. **All without burning a single token.**

<!-- SPEAKER NOTES:
- Hooks are the most underused lever. Most teams skip them entirely.
- Format-on-save: trivial example, immediate ROI — she never ships unformatted code.
- PreToolUse with exit 1 = hard veto. Combined with stop rules in AGENTS.md you get belt + suspenders.
- Hook output (stdout) gets piped back to her desk only if you want it to. Otherwise: silent enforcement.
-->

---

<!-- SLIDE: CONTENT -->
# Hooks — across tools

<!-- ANIMATE: build-rows -->

| Tool | Mechanism | Events |
|------|-----------|--------|
| **Claude Code** | `hooks` in settings.json | PreToolUse · PostToolUse · UserPromptSubmit · SessionStart · Stop |
| **OpenAI Codex (Agents SDK)** | Lifecycle hooks on `Runner` | run_started · tool_started · tool_finished · run_finished · run_failed |
| **GitHub Copilot** | No in-loop hooks → use **pre-commit / GitHub Actions** | git pre-commit · CI on push/PR |

Copilot's gap: enforcement happens at commit / PR time, not mid-session. **Plan for that** — your AGENTS.md soft rules carry more weight there.

<!-- SPEAKER NOTES:
- This is the one lever where Copilot is genuinely behind. Acknowledge it.
- Workaround: pre-commit hooks (Husky / lefthook / pre-commit framework) catch most things before push.
- For Copilot teams: lean harder on AGENTS.md + CI gates + branch protection rules.
-->

---

<!-- SLIDE: CONTENT -->
# Linters in hooks — invisible quality enforcement

<!-- ANIMATE: build-code (one matcher block at a time), build-rows (layer table), emphasis-callout last -->

Every linter you run can fire as a hook. **Format on edit, lint on edit, typecheck before "done" — all invisible to the agent's context, all zero tokens.**

```json
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      // Format C# after every edit
      { "matcher": "Edit|Write",
        "command": "if [[ $CLAUDE_FILE_PATHS == *.cs ]]; then dotnet format --include $CLAUDE_FILE_PATHS; fi" },

      // ESLint + Prettier on TS / JS edits
      { "matcher": "Edit|Write",
        "command": "if [[ $CLAUDE_FILE_PATHS =~ \\.(ts|tsx|js|jsx)$ ]]; then npx eslint --fix $CLAUDE_FILE_PATHS && npx prettier --write $CLAUDE_FILE_PATHS; fi" },

      // Ruff on Python edits
      { "matcher": "Edit|Write",
        "command": "if [[ $CLAUDE_FILE_PATHS == *.py ]]; then ruff check --fix $CLAUDE_FILE_PATHS; fi" }
    ],
    "Stop": [
      // Whole-project typecheck + build before agent declares done
      { "command": "dotnet build --no-restore" }
    ]
  }
}
```

| Layer | Linter | Hook event |
|-------|--------|-----------|
| **Format** | `dotnet format` · Prettier · `ruff format` | every edit |
| **Style / lint** | ESLint · `ruff check` · `dotnet format --verify` | every edit |
| **Types** | `tsc --noEmit` · `dotnet build` · `mypy` | before "done" (Stop) |
| **Tests** | `dotnet test` · `vitest` · `pytest` | before "done" (Stop) |

> **Cheap, deterministic, zero tokens.** The agent never sees the noise — only the signal when something breaks.

**Copilot side:** same idea via `setup-pre-commit` skill (Husky + lint-staged) — runs at git-commit time instead of edit time. Same ROI, slightly later in the loop.

<!-- SPEAKER NOTES:
- This is the highest-ROI hook setup. 30 minutes of work, every dev's PRs are now formatted + linted before review.
- Trick: scope the matcher by file extension so you don't run dotnet format on a Python file.
- Stop hook = "before the agent declares done." Use for whole-project checks (build, typecheck) too heavy for every edit.
- Pair with the AGENTS.md rule "show test output before declaring done" (Block 8 failure modes) — hook enforces, AGENTS.md asks for proof.
- mattpocock/skills includes `setup-pre-commit` which sets up the same idea on the git layer for the Copilot side. Show that command live if there's interest.
-->

---

<!-- SLIDE: CONTENT -->
# Subagents — own desk, return summary

<!-- ANIMATE: build-code (subagent fan-out reveals one branch at a time) -->

Spawn a separate agent in a separate context window. She runs in parallel, fills *her* desk, hands you back a short summary. **Your desk stays clean.**

```
You ──┐
      ├─► Subagent: "code-reviewer"     ← own 200K desk
      ├─► Subagent: "test-runner"       ← own 200K desk
      └─► Subagent: "branch-audit"      ← own 200K desk

         ▼ ▼ ▼  (all return short summaries)
You: "code-reviewer found 3 issues. test-runner: 2 fails. branch-audit: clean."
```

Use them when:
- The work is **read-heavy** (review, audit, search) — keeps tool noise off your desk
- You need **a second opinion** without polluting your own thinking
- Tasks are **parallelizable** — fan out, gather

<!-- SPEAKER NOTES:
- The killer use case at Spark Vision: spawn a review subagent on a draft PR. It reads 30 files, returns "3 issues found at file:line". Your main desk never sees the 30 files.
- Don't overuse — every subagent costs latency and money. Use when read volume would otherwise drown your context.
-->

---

<!-- SLIDE: CONTENT -->
# Subagents — across tools

<!-- ANIMATE: build-rows -->

| Tool | Mechanism |
|------|-----------|
| **Claude Code** | `Task` tool + subagent definitions in `.claude/agents/*.md` |
| **OpenAI Codex (Agents SDK)** | Multi-agent orchestration via **handoffs** + `Agent.spawn()` |
| **GitHub Copilot** | **Agent mode** + background coding agents (preview, GA in 2026) |

All three converge on the same shape: **a parent agent delegates a self-contained task to a child with its own context.**

<!-- SPEAKER NOTES:
- Claude calls them "subagents", OpenAI calls them "handoffs", Copilot calls them "background agents". Same idea.
- Background agents in Copilot work async on issues — file an issue, agent picks it up, opens a PR. Different latency profile, same delegation pattern.
-->

---

<!-- SLIDE: CONTENT -->
# Commands — reusable workflows

A **Command** is a slash command that expands into a structured prompt or skill chain.

```markdown
<!-- .claude/commands/sv-pr-review.md -->
---
description: Run the Spark Vision PR review checklist
---

You are reviewing a draft PR. Apply the checklist:
1. Touched stop-rule areas (rendering, asset bridge)? → flag for human
2. Tests added for new behavior? → list missing
3. Format / lint clean? → report
4. AGENTS.md rules followed? → flag deviations

Output: markdown table of findings, severity, file:line.
```

Now anyone on the team types `/sv-pr-review` and gets the same review pass.

<!-- SPEAKER NOTES:
- Commands turn tribal "how I always prompt this" into a reusable team asset.
- Build commands for the things you do weekly: PR review, security scan, /init for a new module, /sv-import-catalog.
- Keep them under 30 lines. Long commands = wrong abstraction (use a skill instead).
-->

---

<!-- SLIDE: CONTENT -->
# Commands — across tools

<!-- ANIMATE: build-rows -->

| Tool | Mechanism | Invocation |
|------|-----------|------------|
| **Claude Code** | `.claude/commands/*.md` | `/command-name` |
| **OpenAI Codex (Agents SDK)** | Custom tools / parameterized prompts | Function call from agent |
| **GitHub Copilot** | **Prompt files** | `/prompt-name` in chat (Copilot chat) |
| **Cursor** | Custom modes / rules | `/mode` toggle |

> **One pattern, four implementations.** The skill is in writing the prompt — not in choosing the tool.

<!-- SPEAKER NOTES:
- Copilot prompt files went GA April 2026. They're the equivalent of Claude's commands and the closest portable format.
- Several teams keep prompts in a tool-agnostic prompts/ folder, then symlink/copy to the tool-specific path.
-->

---

<!-- SLIDE: CONTENT -->
# The connections layer — how she reaches the outside

<!-- ANIMATE: build-rows (table), build-code (ASCII tree branches reveal one by one), emphasis-callout last -->

The four levers shape **behavior**. Connections shape **what she can do** — read your data, file your issues, run your CI, talk to your design tools.

**Three mechanisms — pick the right one per service:**

| Mechanism | What it is | When to use |
|---|---|---|
| **MCP server** | Model Context Protocol — open standard (Anthropic, late 2024) for agent ↔ service connectors. Long-running, schema'd, discoverable tools. | Long-lived integrations: GitHub, Slack, Linear, Figma, your DB |
| **CLI** | Shell command the agent invokes via Bash | Fast, deterministic ops: `gh issue create`, `dotnet test`, `git`, custom `sv-*` scripts |
| **HTTP / API** | Direct fetch from inside a skill or tool body | One-off integrations, internal services without an MCP server yet |

```
   Agent
     ├─► MCP servers      (github, slack, linear, figma, postgres, your-db)
     ├─► CLI tools        (gh, git, dotnet, npm, custom sv-* scripts)
     └─► HTTP APIs        (everything else with a URL)
```

> **MCP gives durability and discoverability. CLI gives speed and determinism. APIs give reach.**
> Production setups use all three.

<!-- SPEAKER NOTES:
- This is the gap between "agent in a chat box" and "agent that ships end-to-end".
- MCP (Model Context Protocol) is the open standard. Anthropic introduced it late 2024; OpenAI, Google, GitHub all support it in 2026. Hundreds of MCP servers exist now (community + first-party).
- CLI is underrated. `gh issue create` is often simpler and faster than going through a GitHub MCP server. Pick whichever fits the job.
- For SV: catalog import uses `gh` (CLI) + a future custom Salgar MCP server (long-lived) + maybe one-off Figma API calls (HTTP). Three mechanisms, one feature.
-->

---

<!-- SLIDE: CONTENT -->
# Connections — across tools

<!-- ANIMATE: build-rows -->

| Tool | Connection layer |
|------|------------------|
| **Claude Code** | MCP servers (`~/.claude.json` or repo `.mcp.json`) + Bash + WebFetch |
| **OpenAI Codex (Agents SDK)** | MCP via `MCPServerStdio` / `MCPServerSSE` + function-calling tools |
| **GitHub Copilot** | MCP servers (GA 2026) + agent-mode tool calls |
| **Cursor** | MCP servers (`.cursor/mcp.json`) + terminal tool |

> **Same protocol. Different host.** A GitHub MCP server you wire up today works in all of them.

<!-- SPEAKER NOTES:
- Cross-tool portability: an MCP server is just a stdio process speaking JSON-RPC. Every host calls it the same way.
- Practical implication: when the SV team builds the `sv-salgar` MCP server, every dev on the team gets it regardless of which agent they prefer.
-->

---

<!-- SLIDE: CONTENT -->
# Spark Vision's connection set — wishlist for the sprint

<!-- ANIMATE: build-rows (one service at a time), emphasis-callout last -->

| Service | Mechanism | Why |
|---|---|---|
| **GitHub** | `gh` CLI + GitHub MCP server | Issues, PRs, reviews — every Spec Kit command writes here |
| **Unity asset bridge** | Custom CLI `sv-unity-export` | Deterministic, scriptable, fits hook flow |
| **Salgar / catalog DB** | Custom MCP server `sv-salgar` | Long-lived schema'd access — agent can browse, search, validate |
| **Figma** | Figma MCP server (official) | Design-to-token sync (**Mikael's 18 March ask**) |
| **PDF catalogs** | CLI `pdf-extract` + `agent-pdf-quirks` skill | Salgar import pipeline |
| **Slack / Teams** | Community MCP server | "Build green / failed" pings, ask a reviewer |
| **Sortiment DB** | Postgres MCP server (read-only) | Schema introspection + safe SELECTs — DDL stays gated |

> **One AGENTS.md. One `skills/` folder. One `mcp.json`.** Every agent on the team gets the same hands.

<!-- SPEAKER NOTES:
- This is a wishlist, not a build list — adapt to what SV actually has. Print as a worksheet for sprint kickoff Monday.
- The Salgar MCP server is the real candidate to build first; it pays back immediately on the catalog import pipeline (Block 7 BDD example).
- Figma MCP server is official — directly answers Mikael's "automatisk synk från Figma" ask.
- DB MCP servers default to read-only. Don't expose DDL/DELETE without explicit tool gating + AGENTS.md stop-rule.
- When the team builds their own MCP server (Salgar), point them at the `mcp-builder` skill — Anthropic ships a great one.
- Tie back: AGENTS.md (constitution) + skills (capabilities) + connections (reach) + Spec Kit (workflow) — that's the full kit.
-->

---

<!-- SLIDE: CONTENT -->
# Decision tree — which lever?

<!-- ANIMATE: build-code (each branch reveals one at a time) -->

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

**Wrong choice = burned tokens.** Hook in AGENTS.md = always-on noise. Skill as hook = doesn't fire when you need it.

<!-- SPEAKER NOTES:
- Print this. Stick on the wall.
- Most early mistakes: putting everything in AGENTS.md → desk crowded; or writing a skill for a one-off prompt → never triggered.
- When in doubt: start with AGENTS.md. Promote to skill/command/hook when you've used it 3+ times.
-->

---

<!-- SLIDE: CONTENT -->
# Real example — three agents, one repo

<!-- ANIMATE: build-code (architecture diagram reveals top-down), emphasis-callout last -->

I built this last weekend.

```
       ┌──────────────────────────────────────────────┐
       │   ONE REPO · ONE AGENTS.md · ONE skills/     │
       └──────────────────────────────────────────────┘
              ▲                ▲                ▲
       ┌──────┘                │                └──────┐
       │                       │                       │
  ┌─────────────┐       ┌─────────────┐         ┌─────────────┐
  │  Codex 5.5  │       │ Claude 4.7  │         │   Copilot   │
  │  the brain  │       │  tech lead  │         │   agents    │
  │  — builder  │       │  — PR review│         │  — parallel │
  └─────────────┘       └─────────────┘         └─────────────┘
```

Different vendors. **Same harness.** Each one productive on day 1.

<!-- SPEAKER NOTES:
- Weekend project, real. Don't overstate scope — but it's a concrete proof.
- Role split played to model strengths: Codex 5.5 = builder/brain; Claude 4.7 = tech-lead reviewer (good at criticizing diffs, asking the right questions); Copilot agents = parallel background work.
- All three saw the same AGENTS.md, same skills/, same stop rules. Vendor-agnostic. Harness does the work.
- Set up the punchline → next slide reveals the self-evolving twist that ties Block 1 + 2 + 3 together.
-->

---

<!-- SLIDE: CONTENT -->
# The twist — self-evolving skills

<!-- ANIMATE: emphasis-callout (the rule first), build-code (folder reveals one entry at a time), emphasis-callout last -->

The agents had one extra rule:

> *If you get stuck, solve it, and you've seen this kind of stuck* **3 times** *— write the solution as a skill, prefix it* `agent-`, *commit it.*

```
.claude/skills/
├── sv-catalog-import/                   ← human-written
├── agent-unity-asset-bridge-quirks/     ← Codex 5.5, after 3rd repeat
├── agent-flaky-test-pattern/            ← Claude 4.7, after 3rd repeat
└── agent-csproj-restore-fix/            ← Copilot, after 3rd repeat
```

**One agent gets stuck once. The team gets stuck zero times after that.**

The 2-mistake rule from Block 2 — **automated, by the agents themselves.**

<!-- SPEAKER NOTES:
- The `agent-` prefix is the trick: namespaces auto-generated skills so you can review them in PR, prune the bad ones, see which problems repeat across the codebase.
- 3-strike threshold means one-offs don't pollute skills/. Only recurring patterns make it in.
- Loop closure: Block 1 said "harness > model". Block 2 said "AGENTS.md is portable". Block 3 said "five levers". This slide says "yes, all three actually work — together — across vendors — and the system improves itself."
- Pair this with the `write-a-skill` skill (next section) — that's what the agents invoke when promoting a 3-strike pattern.
-->

---

<!-- SLIDE: CONTENT -->
# Don't write skills from scratch — open-source library

<!-- ANIMATE: emphasis-callout (the headline + viral note), build-code (install command) -->

**`github.com/mattpocock/skills`** — Apache-2.0, ~20 production skills.
**`grill-me` went viral** in 2026 (Pocock, *"My Grill-Me Skill Went Viral"*, aihero.dev).

**Install in 30 seconds:**
```bash
npx skills@latest add mattpocock/skills/grill-me
npx skills@latest add mattpocock/skills/to-prd
# … one per skill
```

Description + SKILL.md is portable: works in Claude Code today, copies cleanly into Codex Agents SDK tools and Copilot prompt files.

> **Three categories. Pick what you need. Next three slides walk through each.**

<!-- SPEAKER NOTES:
- This single repo replaces ~70 % of the skills you'd write yourself. Apache-2.0 — drop in, no permission.
- Matt Pocock is well-known in the TS / DDD / agentic-dev community. These are battle-tested.
- `grill-me` specifically blew up in 2026 — Matt wrote a follow-up post ("My Grill-Me Skill Went Viral"). Why it spread: three lines of instruction, one killer mechanism (decision-tree walk), immediate ROI on PRD quality.
- Install via the npx command. No clone, no copy-paste. Works for user-level or repo-level `.claude/skills/`.
- KEY POINT: the WHOLE afternoon pipeline (Idea → grill-me → to-prd → to-issues → tdd → triage-issue → qa) IS the practitioner workflow. We're not making this up.
- Next three slides break the library into Planning · Development · Tooling.
-->

---

<!-- SLIDE: CONTENT -->
# Skills library — Planning & Design

<!-- ANIMATE: build-rows -->

| Skill | What it does | Maps to |
|---|---|---|
| **`grill-me`** | Walk the design tree, one decision at a time, recommended answer included | Block 5 |
| **`domain-model`** | Stress-test plan against existing `CONTEXT.md` + ADRs, update inline | Block 5 |
| **`ubiquitous-language`** | Extract DDD glossary, flag synonyms / overloaded terms | Block 5 |
| **`to-prd`** | Synthesize PRD from current context, file as GH issue | Block 5 |
| **`to-issues`** | Break PRD into HITL/AFK tracer-bullet vertical slices | Block 6 |
| **`zoom-out`** | "Give me the map; I'm lost" — broader context | Anytime |

> **The whole `/specify` → `/plan` workflow can run on these alone.**

<!-- SPEAKER NOTES:
- This is the Block 5 + 6 toolkit. CPO bouncing an idea workflow uses 4 of the 6 (zoom-out, ubiquitous-language, grill-me, to-prd).
- domain-model is the heavyweight version of grill-me when there's already a CONTEXT.md / ADR set in the repo.
-->

---

<!-- SLIDE: CONTENT -->
# Skills library — Development

<!-- ANIMATE: build-rows, emphasis-callout last -->

| Skill | What it does | Maps to |
|---|---|---|
| **`tdd`** | Red → green → refactor — *vertical*, one slice at a time | Block 7 |
| **`triage-issue`** | Investigate a bug, find root cause, file issue with TDD-based fix plan | Block 9 (zero-bug) |
| **`qa`** | Conversational bug intake → durable, user-focused GH issues | Block 9 |
| **`improve-codebase-architecture`** | Hunt shallow modules, deepen them, improve testability | Block 9 (Linear time) |
| **`request-refactor-plan`** | Tiny-commit refactor plan, filed as GH issue | Block 9 (Linear time) |
| **`caveman`** | Token-frugal mode (~75 % reduction) — drops fluff, keeps tech | Anytime |

> **Linear-time-saved tie-in:** `improve-codebase-architecture` + `request-refactor-plan` are exactly what you point devs at during Quality Friday.

<!-- SPEAKER NOTES:
- These are the Block 7 + 8 + 9 workhorses.
- Pocock built tooling for the same workflow Linear runs as ritual. Pair them: ritual + tool.
-->

---

<!-- SLIDE: CONTENT -->
# Skills library — Tooling & Meta

<!-- ANIMATE: build-rows, emphasis-callout last -->

| Skill | What it does | Maps to |
|---|---|---|
| **`git-guardrails-claude-code`** | PreToolUse hook blocks `push`, `reset --hard`, `clean`, `branch -D` | Block 3 (hooks) |
| **`setup-pre-commit`** | Husky + lint-staged + Prettier + typecheck + test | Block 3 (Copilot side) |
| **`write-a-skill`** | Meta — scaffold a new skill with progressive disclosure | Self-evolving (3-strike) |

> **`write-a-skill` is the engine behind `agent-`-prefix self-evolving skills.**
> When the 3-strike rule fires, the agent invokes `write-a-skill` to commit the pattern.

<!-- SPEAKER NOTES:
- This is the smallest category but the highest-leverage on day 1: drop the git-guardrails skill, and you're protected from the agent's worst impulses immediately.
- write-a-skill closes the loop with the morning's "real example" slide. The self-evolving system is real because there's a skill that scaffolds new skills.
-->

---

<!-- ============================================================ -->
<!-- BLOCK 4: THE LOOP                                             -->
<!-- ============================================================ -->

<!-- SLIDE: SECTION — dark navy bg -->
# Block 4
## The loop
*Plan → Build → Simplify → Verify*

<!-- SPEAKER NOTES:
- Time: 11:30–12:00
-->

---

<!-- SLIDE: CONTENT -->
# The 4-phase loop

<!-- ANIMATE: build-code (each phase appears in sequence) -->

For any non-trivial task, run her through 4 phases. Each phase = a clean desk transition.

```
   ┌──────────┐    ┌──────────┐    ┌────────────┐    ┌──────────┐
   │  PLAN    │───►│  BUILD   │───►│  SIMPLIFY  │───►│  VERIFY  │
   └──────────┘    └──────────┘    └────────────┘    └──────────┘
   read-only       small edits     refactor            tests +
   ask first       checkpoint      dedupe              human eyes
   list unknowns   often           remove dead         BDD passes
```

> **One phase, one desk.** Clear or compact between phases.

<!-- SPEAKER NOTES:
- The loop is fractal — apply it to a 30-min task or a 3-day feature. Same shape.
- Every phase transition is a chance to /clear or /compact. Most teams skip this. Don't.
- Skipping Simplify is the most common mistake. It's where she earns her keep.
-->

---

<!-- SLIDE: CONTENT -->
# Plan Mode — read-only fresh desk

<!-- ANIMATE: build-rows, build-bullets -->

In Plan Mode she **can read but not write.** Forces exploration before commitment.

| Tool | How to enter Plan Mode |
|------|------------------------|
| **Claude Code** | `Shift + Tab` (cycles through modes) |
| **OpenAI Codex (Agents SDK)** | Run with read-only tools (no `write_file`) |
| **GitHub Copilot** | "**Ask** mode" (vs Agent mode) |
| **Cursor** | "**Ask**" / chat-only |

Plan output should always include:
- Files to read
- Files to change (with intent, not code)
- Tests to add
- **Unresolved questions** ← from your AGENTS.md

<!-- SPEAKER NOTES:
- Plan Mode separates *thinking* from *doing*. Without it she commits to a path before understanding the problem.
- Combined with the AGENTS.md "list unresolved questions" line: she stops and asks instead of guessing. This single combo is the highest-leverage thing in the workshop.
- Across tools: it's "the read-only mode where she explores". Every tool has one — find it.
-->

---

<!-- SLIDE: CONTENT -->
# Build — execute, but small

Once the plan is good:

- **Tight loops.** Edit → test → review. Don't let her run 30 min headless.
- **Checkpoint every ~50 messages.** `/context` to see the desk.
- **Compact, don't clear, mid-build.** Keep the plan in memory.
- If she goes off-script: stop, `/clear`, **resume from the plan**. Don't argue mid-stream.

```
✗ Bad: "go implement everything, ping me when done"
✓ Good: "implement step 1 of the plan. Run tests. Stop. Show me the diff."
```

<!-- SPEAKER NOTES:
- "Stop and show me the diff" is the magic phrase. It's a checkpoint, costs nothing, lets you steer.
- Headless 30-min runs feel productive. Almost always end in 10K of code that needs to be redone.
-->

---

<!-- SLIDE: CONTENT -->
# Simplify — the secret weapon

After build, before verify, **ask her to simplify.**

```
Look at the changes you just made. Where can you:
- remove duplication?
- delete dead-code paths?
- inline trivial helpers?
- collapse adjacent if-statements?
Simplify without changing behavior. Show me the diff.
```

Typically catches **30%+ of unnecessary lines.** She isn't precious about her own code — she'll happily delete it.

> **The agent is a worse author than a senior dev. But a better reviewer of her own work than most senior devs.**

<!-- SPEAKER NOTES:
- This is the slide that consistently surprises rooms. People skip Simplify because it feels like overhead. It's the highest-ROI step.
- Try this on any agent-generated PR you have lying around. You'll find at least one chunk of unnecessary scaffolding.
- Anthropic's internal tooling teams report Simplify catches issues that wouldn't have failed any test but would have rotted the codebase.
-->

---

<!-- SLIDE: CONTENT -->
# Verify — close the loop

Don't accept "looks good." Require evidence.

| Check | What you ask for |
|-------|------------------|
| Tests | "Run the test suite. Paste the output." |
| Lint / format | Hook should already enforce — verify pass |
| Build | "Run the build. Show me green." |
| BDD scenarios | "Which Gherkin scenarios from the spec are now covered?" |
| Visual (Unity) | Screenshot before/after — eyeball or vision-model diff |
| Stop-rule areas | "Did you touch rendering / asset bridge / migrations?" |

> She must say what she verified — not "I'm done."

<!-- SPEAKER NOTES:
- Mikael asked specifically about Unity testing — we'll go deeper in Block 7 this afternoon. Tease it here.
- The "what you verified" framing matters. "I'm done" is a status; "I ran X tests, all passed" is evidence.
- Hooks (Block 3) automate most of this — the human-eyes step is for stop-rule areas and visuals.
-->

---

<!-- SLIDE: HANDS-ON — warm yellow bg -->
# 🔨 Hands-on 2 — Plan Mode with questions (15 min)

Pick a small real issue from your backlog (or grab one from `SV-` issues).

**Step 1 — enter Plan Mode**
- Claude: `Shift + Tab` until you see "plan mode"
- Codex: read-only tools only
- Copilot: switch to **Ask** mode

**Step 2 — describe + ask for questions**
> *"Here's the task: [paste]. **Before you write the plan, ask me 3–5 questions about anything you're unsure of.** Then propose 2 alternative approaches with trade-offs. End with unresolved questions."*

**Step 3 — answer, choose, switch to Build**

**Goal:** feel the difference between asking-first vs guessing-first.

<!-- SPEAKER NOTES:
- 15 min is enough for 1 task end-to-end through Plan Mode.
- Circulate. Listen for "she didn't ask anything" → check their AGENTS.md has the unresolved-questions line.
- The "ah-ha" moment usually lands here. It's the cheapest behavior change with the biggest delta.
-->

---

<!-- SLIDE: STEP -->
*🍝 Lunch — 60 min*

---

<!-- ============================================================ -->
<!-- AFTERNOON: SPEC-DRIVEN DEVELOPMENT WITH SPEC KIT              -->
<!-- ============================================================ -->

<!-- SLIDE: SECTION — dark navy bg -->
# Afternoon
## Spec-Driven Development
*with GitHub Spec Kit*

<!-- SPEAKER NOTES:
- Time: 13:15–16:00
- The morning was the harness: AGENTS.md, hooks, skills, subagents, the loop.
- The afternoon is the WORKFLOW. Specifically: Spec-Driven Development (SDD) using GitHub's open-source Spec Kit.
- Mikael asked for spec-driven utveckling explicitly in his 18 March mail. This is exactly that — formalized, tooled, repeatable, vendor-agnostic.
- One issue, end to end. Pick one real SV- issue at the start of the afternoon. Stay with it through every command.
-->

---

<!-- SLIDE: CONTENT -->
# Spec-Driven Development — what & why

<!-- ANIMATE: build-bullets (vibes-coding line first, then SDD line), build-bullets (speckit feature list), build-code (install command last) -->

**Vibes-coding** (the default with agents):
> Idea → "build me X" → agent generates → you review → 60 % wrong → iterate

**Spec-Driven Development (SDD):**
> Idea → **spec** → **plan** → **tasks** → **implement** → ship

The spec is the **source of truth.** The agent stops being a stochastic generator and becomes an executor of an explicit, reviewable plan.

**GitHub Spec Kit (`speckit`)** — the OSS toolkit that made SDD-with-agents mainstream:
- Apache-2.0 · `github.com/github/spec-kit`
- Works in **Claude Code, Codex, Copilot, Cursor, Gemini CLI** — vendor-agnostic
- 5 slash commands drive the whole flow
- All artifacts (spec, plan, tasks) live in the repo at `specs/<feature>/`

**Install:**
```bash
uvx --from git+https://github.com/github/spec-kit.git specify init <project>
```

<!-- SPEAKER NOTES:
- SDD isn't new — it's how serious shops have worked for decades. What's new in 2026: agents are fast enough to make the cycle short.
- "Spec is the source of truth" is the line. Without it, the agent invents. With it, the agent executes a plan you've reviewed.
- speckit was Den Delimarsky's project at GitHub. It's the de-facto standard for SDD-with-agents.
- vendor-agnostic: matters for SV. Some devs run Copilot, some run Claude Code. Same workflow.
-->

---

<!-- SLIDE: CONTENT -->
# The Spec Kit flow — five slash commands

<!-- ANIMATE: build-code (each /command reveals top-down), build-rows (mapping table) -->

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

| Command | Block this afternoon | Skills that augment it |
|---|---|---|
| `/constitution` | Reuses your morning AGENTS.md | — |
| `/specify` | **Block 5** | `to-prd` · `domain-model` · `ubiquitous-language` |
| `/clarify` | **Block 5** | `grill-me` (same idea, Pocock's OSS version) |
| `/plan` | **Block 6** | `zoom-out` · `improve-codebase-architecture` |
| `/tasks` | **Block 6** | `to-issues` (HITL/AFK tracer-bullet slices) |
| `/implement` | **Blocks 7 + 8** | `tdd` (red→green→refactor) |

> **Spec Kit is the spine. `mattpocock/skills` are the limbs. AGENTS.md is the constitution.**

<!-- SPEAKER NOTES:
- This is the afternoon's roadmap. Print it. Stick it on the wall.
- /clarify and grill-me solve the same problem from two angles. Use whichever is in muscle memory. Both work.
- /constitution lets you encode project principles for speckit; reuse content from AGENTS.md so you don't write rules twice.
- Each phase produces a checkable artifact in the repo. That's the SDD discipline: every step is reviewable, diffable, mergeable.
-->

---

<!-- ============================================================ -->
<!-- BLOCK 5: /SPECIFY (IDEA → SPEC)                               -->
<!-- ============================================================ -->

<!-- SLIDE: SECTION — dark navy bg -->
# Block 5
## `/specify` — idea → spec
*Spec Kit's first command, augmented with grill-me + to-prd*

<!-- SPEAKER NOTES:
- Time: 13:15–13:45
- This block produces specs/<feat>/spec.md — the source of truth that drives everything else.
- speckit's /specify takes a free-form description. We'll show how to enrich it with grill-me (interrogate first) and to-prd (synthesize) so the input is sharp.
- Pick a real SV- issue at the very start of this block. Stay with it for the whole afternoon.
-->

---

<!-- SLIDE: CONTENT -->
# The fuzzy idea problem

You have an idea. Stakeholders have an idea. Engineers have an idea. **None of them are the same idea.**

Symptoms:
- "Just build a quick prototype" → 6 weeks of rework
- PRD written in isolation → misses the real constraint
- Engineers fill in the blanks → wrong feature, perfectly built
- Agent writes a "PRD" on request → 70% generic fluff, 30% projection

**The bottleneck isn't writing. It's *getting the idea sharp enough to write.***

<!-- SPEAKER NOTES:
- Every team in the room has lived this.
- Naming the failure mode is half the cure. Once you see "agent fluff PRD" you can't unsee it.
-->

---

<!-- SLIDE: CONTENT -->
# The grill-me pattern (skill: `grill-me`)

<!-- ANIMATE: emphasis-callout (the design-tree quote), build-code (tree walks one branch at a time), build-bullets (three rules) -->

The skill that **went viral** in the agentic-dev community in 2026. The full body is **three lines**. This is the line that did it:

> ### *"Walk down each branch of the design tree, resolving dependencies between decisions one-by-one."*

```
              fuzzy idea
                  │
                  ▼
              Q1: scope?
              ├─ broad   → unlocks Q2a, Q2b
              └─ narrow  → unlocks Q3   ← you pick this
                                │
                                ▼
                            Q3: storage?
                            ├─ Postgres (recommended)
                            └─ Redis
                                  │
                                  ▼
                              Q4: schema shape?
                                  │
                                  ▼
                                  …
```

**She walks. You answer. She moves to the next branch.** Dead branches get pruned.

Three rules that make it work where "write a PRD" doesn't:

1. **One question at a time.** No 12-question wall.
2. **Recommended answer included.** You accept or push back — 30 sec, not 30 min.
3. **Codebase first.** If the answer is in code, she reads it instead of asking.

<!-- SPEAKER NOTES:
- The skill blew up in 2026 specifically because of the design-tree walk. Matt's article ("My Grill-Me Skill Went Viral", aihero.dev) makes the point: it's not the questions, it's the *order* and *dependency awareness*.
- Walking the tree means: each answer unlocks the next branch's questions, and dead branches get pruned without wasting your time. That's why people who tried "write me a PRD" for years found grill-me magical.
- "Recommended answer included" is the killer accelerator. Without it, every question is a 30-min explanation. With it, every question is a 30-sec yes/no/here's-why.
- "Codebase first" prevents fake interviewing. If she can grep the answer, she does. Saves your time and her tokens.
- Three lines. That's the entire skill body. Print the SKILL.md and pin it on the wall — it's that compact.
-->

---

<!-- SLIDE: CONTENT -->
# Adjacent skills — sharpen the language while you grill

<!-- ANIMATE: build-rows, emphasis-callout last -->

These three pair with `grill-me`. Run them in this order on a fuzzy idea:

| Skill | Purpose | Output |
|-------|---------|--------|
| **`zoom-out`** | "I don't know this area." Get a map of relevant modules + callers. | Mental model |
| **`ubiquitous-language`** | Extract DDD glossary from the conversation. Flag synonyms, overloaded terms. | `UBIQUITOUS_LANGUAGE.md` |
| **`domain-model`** | Stress-test the plan against existing `CONTEXT.md` and ADRs. Update them inline. | Updated `CONTEXT.md` + `docs/adr/` |
| **`grill-me`** | Walk down the decision tree, recommended answers, one question at a time. | Resolved branches |
| **`to-prd`** | Synthesize what's now in context into a PRD. File as GitHub issue. | `gh issue create` URL |

**The pipeline:** `zoom-out` → `ubiquitous-language` → `domain-model` → `grill-me` → `to-prd`.

> **By the time `to-prd` runs, there's no fluff to invent — every decision is already grounded.**

<!-- SPEAKER NOTES:
- This pipeline is why mattpocock/skills feels like a system, not a grab-bag.
- You don't run all five every time. For a small change: skip zoom-out and ubiquitous-language, go straight to grill-me. For a new module: run all five.
- domain-model writes ADRs as decisions crystallize. That's how `docs/adr/` grows organically without ceremony.
- to-prd doesn't interview — it synthesizes. So you grill first, then to-prd.
-->

---

<!-- SLIDE: CONTENT -->
# Why grill-me + to-prd beats "write a PRD"

| "Write me a PRD for X" | grill-me → to-prd |
|---|---|
| She fills blanks with plausible defaults | She asks where the actual constraint is |
| Generic personas | Your real customer, named |
| "Success: users are happy" | "Success: <metric> > <number> within <window>" |
| In-scope: everything | In-scope vs out-of-scope, explicitly |
| Output: 70% fluff | Output: grounded in your answers + filed as GH issue |

**Same model. Different workflow. Production output instead of marketing fluff.**

<!-- SPEAKER NOTES:
- The contrast slide is what sells the workflow.
- Try both on the same idea after the workshop. Keep the diff. Show your team.
-->

---

<!-- SLIDE: DEMO — light bg, red 🔴 dot -->
# 🔴 DEMO: GRILL-me on a real Spark Vision issue

Pick something concrete. Suggested: an open `SV-` issue, or "agent that imports a PDF furniture catalog into Salgar JSON."

**Live, in front of the room** (using `mattpocock/skills`):
1. `/zoom-out` — get a map of the relevant Sortiment / Salgar modules
2. `/ubiquitous-language` — extract glossary from prior catalog conversation
3. `/grill-me` — interrogate down the decision tree, one question at a time, recommended answers included
4. `/to-prd` — synthesize the PRD, file as GH issue (`gh issue create`)

**Output: a GitHub issue with the PRD body, ready for `/plan` in Block 6.**

<!-- SPEAKER NOTES:
- Demo, ~15 min. Pick a real SV- issue ahead of time.
- If the skills aren't installed in their env yet: `npx skills@latest add mattpocock/skills/grill-me` etc. Takes 60 seconds.
- The to-prd output is a GitHub issue, not a markdown file — that's intentional. It's already where the team works.
- Save the issue URL — Block 6 picks it up directly with `gh issue view` to feed `/specify` and then `/plan`.
-->

---

<!-- SLIDE: CONTENT -->
# Use case — a CPO bouncing an idea (no codebase needed)

<!-- ANIMATE: build-code (chain reveals top-down), build-bullets (why-better list) -->

Not every PRD starts in the codebase. A product person often has a half-formed idea and needs a thinking partner.

**The chain (no engineer in the loop):**

```
   CPO  (Mac, Claude Code, no repo open required)
        │
        ▼
   /grill-me              ← agent asks. CPO answers. Decision tree walked.
        │                   recommended answers offered for every Q.
        ▼
   /ubiquitous-language   ← (optional) extract glossary, flag synonyms,
        │                   save as UBIQUITOUS_LANGUAGE.md
        ▼
   /to-prd                ← synthesize what's now in conversation. NO further
        │                   interview — just produces PRD + files GH issue.
        ▼
   GH issue ready for /specify + /plan
```

**Why this beats "write me a PRD for X" from a CPO:**
- CPO doesn't have to know what fields a PRD needs
- Agent walks the tree → no missed branches, no missing constraints
- Output is grounded in the CPO's actual answers, not in PRD-template clichés
- Engineering meets a sharpened PRD, not a fuzzy one

**At Spark Vision:** Ellen (CPO) can run this from her own machine. Engineering joins the conversation only when `/specify` opens the spec.

<!-- SPEAKER NOTES:
- This matters for SV. Ellen Hartelius is CPO. She can drive this skill chain from her own laptop — no engineer in the loop until the PRD is ready for /plan.
- "No codebase needed" matters: grill-me + to-prd works without a repo. A product person installs Claude Code, runs the skills, files an issue.
- to-prd's instruction is literally "Do NOT interview the user — just synthesize what you already know." That's why grill-me runs FIRST. Without prior interview, to-prd produces a generic PRD. With it, the PRD is sharp.
- ubiquitous-language is optional but high-leverage: it surfaces the synonyms ("customer" vs "client" vs "user") that always cause friction later.
-->

---

<!-- ============================================================ -->
<!-- BLOCK 6: PRD → SPEC / TRD                                     -->
<!-- ============================================================ -->

<!-- SLIDE: SECTION — dark navy bg -->
# Block 6
## `/plan` + `/tasks` — spec → vertical slices
*Spec Kit's plan + tasks commands, augmented with `to-issues`*

<!-- SPEAKER NOTES:
- Time: 13:45–14:15
-->

---

<!-- SLIDE: CONTENT -->
# Two documents, two readers

| Document | Reader | Answers |
|----------|--------|---------|
| **PRD** | Product / stakeholder | What. Why. For whom. Success metric. |
| **Spec / TRD** | Engineering / agent | How. APIs. Schemas. Error states. NFRs. |

**If you skip the Spec, the agent writes one in her head — calibrated for the average codebase, not yours.**

<!-- SPEAKER NOTES:
- The PRD lives in product-land. The Spec lives in your repo, next to the code.
- Many teams conflate the two. Symptom: stakeholders argue about API names; engineers argue about user value. Two docs solve this.
-->

---

<!-- SLIDE: CONTENT -->
# What's in Spark Vision's Spec

<!-- ANIMATE: build-code (one section of the spec at a time) -->

```markdown
# Spec — Catalog import (Salgar format)

## Architecture
- Entry: backend/Sortiment.Api/Controllers/CatalogController.cs:42
- Pipeline: Sortiment.Application/CatalogImport/* (new module)
- Storage: Sortiment.Infrastructure/Repositories/CatalogRepo.cs

## Data model
- Salgar JSON schema → docs/schemas/salgar-v3.json
- DB delta: + table CatalogImports (id, source, status, dryRun, createdAt)

## API surface
- POST /v2/catalogs/import     { source, dryRun? } → 202 + jobId
- GET  /v2/catalogs/imports/:id → status

## Unity-side impact
- None for v1 (data-only). Future: thumbnail rendering — separate spec.

## Testing
- BDD scenarios: docs/bdd/catalog-import.feature
- Unit: parser, schema validator
- Integration: end-to-end with sample PDFs/

## Rollout
- Feature flag: catalog.import.enabled (default false)
- Dry-run by default. Explicit flag to publish.
```

<!-- SPEAKER NOTES:
- Spec lives in the repo. file:line references mean it tracks the code.
- Unity impact section is critical for SV — anything that touches the asset bridge needs to be flagged here.
- Rollout/feature flag isn't optional — it's the off-ramp if production rejects.
-->

---

<!-- SLIDE: DEMO -->
# 🔴 DEMO: PRD → Spec, with the agent

Hand the agent the PRD output from Block 5 and prompt:

```
Read docs/prd/<feature>.md.
Generate a Spec/TRD that:
- references existing files via file:line (don't paste code)
- lists the data model delta
- defines the API surface (verbs + paths + bodies)
- flags any Unity-side impact
- includes a testing strategy
- includes a rollout plan with a feature flag

End with a list of unresolved technical questions.
```

She'll surface real ambiguities — that's the point. **Discuss those with the team before any code is written.**

<!-- SPEAKER NOTES:
- Live: run this on the PRD we just produced.
- Watch for unresolved-questions output: that's the ROI of the AGENTS.md line we added in Block 2.
- Resolve the questions together, then update the Spec.
-->

---

<!-- SLIDE: CONTENT -->
# Spec → issues — the `to-issues` skill

<!-- ANIMATE: emphasis-callout (the rule), build-code (HORIZONTAL vs TRACER side-by-side), build-bullets -->

The `to-issues` skill (mattpocock/skills) breaks the Spec into independently-grabbable GitHub issues with **one rule:**

> **Each issue is a thin vertical slice through every layer.**
> **Schema + API + UI + tests — all in one slice. Not "all schema first, then all APIs, then all UI."**

```
HORIZONTAL (don't):              TRACER BULLET (do):
  all DB changes      →             slice 1: DB + API + UI + test
  then all APIs                     slice 2: DB + API + UI + test
  then all UI                       slice 3: DB + API + UI + test
  then all tests                    ...
                                    each: demoable, mergeable, reviewable
```

Each issue is tagged:
- **HITL** — human-in-the-loop (architectural decision, design review)
- **AFK** — agent ships without you (prefer this)

**Workflow:** the skill drafts the slices, presents as a numbered list, asks: *"granularity right? dependencies right? merge or split?"* — iterates until you approve, then `gh issue create` for each.

<!-- SPEAKER NOTES:
- This slide carries a lot of weight. Vertical slicing is THE planning skill for agentic dev.
- Why thin: a 1-day vertical slice is debuggable, demoable, and mergeable. A 5-day "implement the API layer" PR is none of those.
- HITL/AFK: be honest. Stop rules from AGENTS.md (rendering pipeline, asset bridge) usually = HITL. Pure CRUD = AFK.
- Catalog import example: each catalog format (Salgar, kitchen, bathroom) = own slice. Each runs end-to-end through PDF parser → JSON → DB write → UI display.
-->

---

<!-- ============================================================ -->
<!-- BLOCK 7: BDD → TDD                                            -->
<!-- ============================================================ -->

<!-- SLIDE: SECTION — dark navy bg -->
# Block 7
## BDD → TDD inside `/implement`
*Behavior drives tests. Tests drive Spec Kit's task execution.*

<!-- SPEAKER NOTES:
- Time: 14:15–15:00
- Mikael asked for BDD specifically + how to test Unity visuals. Both addressed in this block.
- The chain is the point: PRD → BDD scenarios → failing tests (red) → minimum implementation (green) → simplify → verify.
-->

---

<!-- SLIDE: CONTENT -->
# The chain

```
   PRD (what / why)
     │
     ▼
   BDD scenarios (Given / When / Then — stakeholder-readable)
     │
     ▼
   Failing tests, one per scenario  (TDD — red)
     │
     ▼
   Minimum implementation             (TDD — green)
     │
     ▼
   Simplify · Verify
```

The agent writes every step. **You supervise — and own the BDD scenarios.**

<!-- SPEAKER NOTES:
- BDD scenarios are the contract between product and engineering. The human owns them.
- TDD red→green→refactor is mechanical from there. The agent does that well — IF you stop her from horizontal-slicing (next slide).
- Don't skip BDD. Without it, she generates tests that match her implementation — both wrong, both green. Useless.
-->

---

<!-- SLIDE: CONTENT -->
# TDD with an agent — vertical, one test at a time

<!-- ANIMATE: build-code (WRONG block first, then RIGHT block), build-bullets, emphasis-callout last -->

The `tdd` skill (mattpocock/skills) names the failure mode every team hits:

```
WRONG (horizontal — the "agent default"):
  RED:    test1, test2, test3, test4, test5    ← all tests up front
  GREEN:  impl1, impl2, impl3, impl4, impl5    ← then all impl

RIGHT (vertical):
  RED→GREEN: test1 → impl1
  RED→GREEN: test2 → impl2
  RED→GREEN: test3 → impl3
  ...
```

**Why horizontal slicing produces crap tests:**
- Tests written in bulk verify *imagined* behavior, not actual
- You end up testing the *shape* (signatures, data structures), not user-facing behavior
- Tests pass when behavior breaks; fail when behavior is fine

**Vertical:** each test responds to what you learned writing the previous code. You're already in the implementation — you know exactly what to verify.

> *"Tests should verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't."* — `tdd/SKILL.md`

<!-- SPEAKER NOTES:
- This slide is the difference between "agent generated 50 green tests" (worthless) and "5 tests that catch real bugs" (gold).
- The agent default IS horizontal slicing because the prompt typically asks for "all tests for X". Override explicitly: "one test, one impl, commit, next test."
- Connects to Block 4 (the loop): each Plan → Build → Simplify → Verify cycle = ONE test slice. Not five.
-->

---

<!-- SLIDE: CONTENT -->
# BDD — what does it actually look like?

<!-- ANIMATE: build-code (Gherkin reveals line by line), build-rows (keyword table) -->

**Behavior-Driven Development** (Dan North, 2003). Three keywords. That's most of it.

```gherkin
Feature: Import furniture catalog from PDF        ← what capability we're describing
                                                     (one feature per file)

  Scenario: Valid PDF with structured table        ← one specific behavior
    Given a PDF "kitchen_v2.pdf" with 50 SKUs      ← starting state / setup
    When  I run /sv-import-catalog kitchen_v2.pdf  ← the action under test
    Then  a Salgar JSON with 50 entries is produced ← expected outcome
    And   each entry has dimensions and material    ← additional expectations
```

| Keyword | Meaning |
|---------|---------|
| **Feature** | A capability of the system — one Gherkin file per feature |
| **Scenario** | One specific behavior of that feature — one per file as needed |
| **Given** | Pre-condition / starting state |
| **When** | The action that triggers the behavior |
| **Then** | The expected outcome |
| **And · But** | Additional Given/When/Then lines |

**Stakeholder-readable.** A CPO can read it. An engineer can run it. A test framework can execute it.

**Tools that execute Gherkin:** SpecFlow (.NET) · Cucumber (JS / Java / Ruby) · Behave (Python). Same syntax everywhere.

<!-- SPEAKER NOTES:
- BDD is shockingly simple. People get the Given/When/Then format in 60 seconds.
- The point of Gherkin: a non-engineer can read AND approve the scenarios. That's the contract between product and engineering.
- One Feature per file. One Scenario per behavior. Don't cram.
- For SV: SpecFlow is the natural .NET fit. Same Gherkin → executable test.
- Tie back to Block 6: each tracer-bullet task gets 1-3 BDD scenarios. The BDD scenarios are the acceptance criteria for /implement.
-->

---

<!-- SLIDE: CONTENT -->
# BDD example — catalog import

<!-- ANIMATE: build-code (one Scenario at a time) -->

```gherkin
Feature: Import furniture catalog from PDF

  Scenario: Valid PDF with structured product table
    Given a PDF "kitchen_v2.pdf" with 50 SKUs in tabular form
    When  I run /sv-import-catalog kitchen_v2.pdf --dry-run
    Then  a Salgar-format JSON with 50 entries is produced
    And   each entry has dimensions, material, and SKU populated
    And   nothing is written to the catalog table

  Scenario: PDF where SKUs are images, no extractable text
    Given a PDF with photo-only product pages
    When  I run /sv-import-catalog scanned.pdf --dry-run
    Then  the import status is "ocr_required"
    And   no Salgar JSON is produced
    And   the response includes a list of pages needing OCR

  Scenario: Stop rule — auto-publish without flag
    Given a valid catalog PDF
    When  I run /sv-import-catalog kitchen_v2.pdf  (no --publish)
    Then  the import runs in dry-run mode
    And   nothing is written to the live catalog
```

<!-- SPEAKER NOTES:
- 3 scenarios = happy path + degraded input + stop rule. Minimum useful coverage.
- Dry-run-by-default scenario directly enforces the AGENTS.md stop rule. BDD makes the rule executable.
- Mikael: this is the format we'd use across all catalog work. Salgar is the first; same pattern for the kitchen/bathroom variants.
-->

---

<!-- SLIDE: CONTENT -->
# TDD — Gherkin to xUnit

<!-- ANIMATE: build-code (one [Fact] at a time) -->

```csharp
public class CatalogImportTests
{
    [Fact]
    public void ValidStructuredPdf_ProducesSalgarJson_DryRun()
    {
        var result = importer.Import("fixtures/kitchen_v2.pdf",
                                     opts => opts.DryRun = true);

        result.Status.Should().Be(ImportStatus.Success);
        result.Items.Should().HaveCount(50);
        result.Items.Should().AllSatisfy(i => {
            i.Sku.Should().NotBeNullOrEmpty();
            i.Dimensions.Should().NotBeNull();
            i.Material.Should().NotBeNullOrEmpty();
        });
        catalogRepo.Verify(r => r.Save(It.IsAny<Catalog>()), Times.Never);
    }

    [Fact] public void PhotoOnlyPdf_ReturnsOcrRequired() { /* … */ }
    [Fact] public void NoPublishFlag_RunsDryRunByDefault() { /* … */ }
}
```

One Gherkin scenario → one xUnit fact. Red first, then green.

<!-- SPEAKER NOTES:
- The agent writes these tests from the Gherkin. She does this well — translation, not invention.
- Mocked catalogRepo.Verify(Save, Never) directly enforces the dry-run stop rule.
- Spark Vision uses xUnit + FluentAssertions in their .NET stack (assumed — confirm in AGENTS.md).
-->

---

<!-- SLIDE: CONTENT -->
# Red → green → refactor — concrete walkthrough

<!-- ANIMATE: split-into-4 OR build-code (one STEP at a time, not all four at once — this is the slide most worth animating) -->

One scenario, end to end. **The agent writes each step. You decide which scenario is next.**

```
STEP 1 — RED: write the failing test (no implementation)
─────────────────────────────────────────────────────────
[Fact]
public void ImportCatalog_ValidPdf_ProducesSalgarJson()
{
    var result = importer.Import("fixtures/kitchen_v2.pdf",
                                 opts => opts.DryRun = true);
    result.Items.Should().HaveCount(50);
}

$ dotnet test
❌ FAIL — type 'CatalogImporter' does not exist

STEP 2 — GREEN: minimum code to pass (nothing more)
─────────────────────────────────────────────────────────
public class CatalogImporter {
    public ImportResult Import(string path, Action<Opts> cfg) =>
        new ImportResult {
            Items = Enumerable.Range(0, 50).Select(_ => new Item()).ToList()
        };
}

$ dotnet test
✅ PASS — but the impl is fake. That's fine. Next test forces real code.

STEP 3 — REFACTOR (must stay green)
─────────────────────────────────────────────────────────
Extract the parser. Inline the helper. Rename for clarity.
$ dotnet test
✅ PASS — behavior unchanged, code cleaner.

STEP 4 — Next scenario. Repeat.
```

> **Triangulate.** Each new test forces the implementation a little more real.
> **Fake-it-till-you-make-it is the workflow, not a hack.**

<!-- SPEAKER NOTES:
- The fake-it-till-you-make-it part trips most teams. They write a "real" implementation on test 1. That's NOT TDD — that's TFD (test-first development).
- Real TDD: minimum code, even if obviously fake (return constants, hard-coded counts). The next test forces you to generalize. By test 3-4, the impl is real and tested.
- Refactor is non-negotiable. Skip it and you accumulate debt the tests will eventually fail to catch.
- The agent excels at "minimum code to make this green" — better than humans, who tend to over-engineer.
- Tie back to Block 4 (the loop): each red→green→refactor cycle = one Plan→Build→Simplify→Verify pass. The fractal lines up.
-->

---

<!-- SLIDE: CONTENT -->
# Mikael's question — testing Unity / visual logic

<!-- ANIMATE: build-rows, build-bullets -->

Visual logic (e.g. duplicate-product-on-`Ctrl+C` / `Ctrl+V`) is hard to unit-test. **Three layers, increasing fuzziness:**

| Layer | What you assert | Tool |
|-------|-----------------|------|
| **State** | Object graph changed correctly | Unity Test Framework (EditMode + PlayMode) |
| **Snapshot** | Rendered frame matches baseline | Unity recorded image + pixel-diff (with tolerance) |
| **Vision-model** | Did this *look* right per spec? | Take screenshot → ask Claude / GPT-4V "Is there a duplicate at <cursor>?" |

**Pragmatic stack:**
- Logic + state → deterministic tests (fast, run on every PR)
- Visuals → snapshot tests with tolerance (run nightly + on visual-touching PRs)
- Edge cases / regression hunts → vision-model verification (manual or scheduled)

<!-- SPEAKER NOTES:
- This directly answers the question Mikael flagged in his 18 March mail.
- Don't over-invest in vision-model tests — they're slow + non-deterministic. Use as a backstop, not a primary suite.
- Snapshot tests with tolerance > 0 are the workhorse for Unity. The "tolerance" matters: text rendering drifts a few pixels between OS versions.
-->

---

<!-- SLIDE: DEMO -->
# 🔴 DEMO: agent-driven BDD → TDD

Live, on the Spec from Block 6:

```
1. "Generate Gherkin scenarios for this Spec.
    Cover: 1 happy path + 3 edge cases + 1 stop-rule scenario.
    Save to docs/bdd/<feature>.feature."

2. "Convert each scenario into a failing xUnit test (red).
    Use FluentAssertions. Mock external dependencies.
    Save to backend/<Module>.Tests/."

3. "Run dotnet test. Confirm all are red."

4. "Implement the minimum code to make them green.
    Show me the diff after each scenario passes."

5. "All green? Run /sv-pr-review subagent on the diff."
```

<!-- SPEAKER NOTES:
- This is the heart of the afternoon. ~30-40 min, depending on the issue.
- Stop-rule scenario in step 1 is the under-appreciated trick — it makes the AGENTS.md rule executable.
- /sv-pr-review subagent in step 5 ties Block 3 (subagents) into the loop.
-->

---

<!-- ============================================================ -->
<!-- BLOCK 8: IMPLEMENT                                            -->
<!-- ============================================================ -->

<!-- SLIDE: SECTION — dark navy bg -->
# Block 8
## `/implement` — agent runs the plan
*Spec Kit executes task-by-task, you supervise*

<!-- SPEAKER NOTES:
- Time: 15:00–15:30
-->

---

<!-- SLIDE: CONTENT -->
# Implementation, end-to-end

You should now have:

- ✅ PRD (Block 5)
- ✅ Spec / TRD (Block 6)
- ✅ Gherkin + failing xUnit tests (Block 7)

Implementation is now the smallest part of the day. Run the **Plan → Build → Simplify → Verify** loop on each Gherkin scenario in turn.

```
for each scenario in feature:
   plan      (read-only, 1 min)
   build     (minimum code, ≤ 10 min)
   simplify  ("can you remove anything?")
   verify    (test green, lint clean, hooks fired)
```

<!-- SPEAKER NOTES:
- Implementation is suddenly cheap because the upstream work is solid.
- That's the whole bet of this workshop: invest in PRD + Spec + BDD; implementation collapses.
- Ratio shift: pre-AI ~80% implementation / 20% planning. Agentic 2026: ~30% implementation / 70% planning + verification.
-->

---

<!-- SLIDE: CONTENT -->
# Spark Vision-specific guardrails (active during implement)

<!-- ANIMATE: build-rows -->

| Layer | What it does |
|---|---|
| **AGENTS.md** | Stop rules surface ("you're touching rendering — confirm?") |
| **Hook PostToolUse(Edit *.cs)** | `dotnet format` runs after every edit |
| **Hook PostToolUse(Edit)** | If a test file changed → run that test |
| **Hook PreToolUse(Bash dotnet ef *)** | Migration command blocked → require human |
| **Subagent /sv-pr-review** | Spawned at the end of each scenario |
| **settings.json deny list** | `rm -rf`, `ef database update *`, `git push --force` |

**You don't enforce any of this manually. The harness does it.**

<!-- SPEAKER NOTES:
- Whole point: by the time you reach Implement, the harness is doing the policing. You're reviewing intent, not syntax.
- Show their actual settings.json or .claude/hooks live if possible.
-->

---

<!-- SLIDE: CONTENT -->
# Common failure modes

<!-- ANIMATE: build-rows -->

| Symptom | Diagnosis | Fix |
|---|---|---|
| "I implemented it" — no tests run | She skipped verify | AGENTS.md: "show test output before declaring done" |
| Touched 12 files for a 3-file change | Plan was thin | `/clear`, redo Plan with explicit file list |
| Invented an API that doesn't exist | No grounding step | AGENTS.md: "search the codebase before importing" |
| Tests pass but feature broken | BDD scenario incomplete | Add the missing scenario, then red→green |
| Refused to touch X | Stop rule fired correctly | Read her message, decide, unblock if intentional |

**These aren't bugs. They're the feedback loop talking to you.**

<!-- SPEAKER NOTES:
- Reframe: failure modes are calibration data. Each one tells you which lever (AGENTS.md, hook, plan) needs sharpening.
- The 2-mistake rule from Block 2 lives here.
-->

---

<!-- ============================================================ -->
<!-- BLOCK 9: VERIFY & SHIP                                        -->
<!-- ============================================================ -->

<!-- SLIDE: SECTION — dark navy bg -->
# Block 9
## Verify & ship
*Don't trust "looks good"*

<!-- SPEAKER NOTES:
- Time: 15:30–15:55
-->

---

<!-- SLIDE: CONTENT -->
# Pre-ship checklist

<!-- ANIMATE: build-bullets (one checklist item at a time — feels like a real checklist) -->

```
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

<!-- SPEAKER NOTES:
- Print this. Stick on the wall next to the decision tree from Block 3.
- Most checks are automated. The human-eyes ones (visual diff, stop-rule, smoke) are intentional friction.
- Feature flag: cheap insurance. The cost of adding one is ~10 min; the cost of not having one when something breaks is days.
-->

---

<!-- SLIDE: CONTENT -->
# Ship — the human bottleneck moves

<!-- ANIMATE: build-bullets, emphasis-callout last -->

When 10 devs ship 4× more PRs (Red Hat data) → **reviewers drown.**

Defensive moves:
- **First-pass review by subagent** — `/sv-pr-review` catches 60–70% of trivial issues
- **Humans review only:** subagent-flagged issues + stop-rule-area diffs + business-logic intent
- **Trust calibration:** track agent-PR defects per month — tune trust accordingly
- **Branch protection:** AGENTS.md compliance + tests + 1 human approval still required

> **The bottleneck moves from typing to deciding. That's the right place for it.**

<!-- SPEAKER NOTES:
- This was Mikael's other big question (18 March mail): "How do we handle PR review when volume goes up?"
- The honest answer: subagent does pass 1, humans do pass 2 (intent + stop rules), and you measure defect rates monthly so trust grows from data, not from vibes.
- Don't lower the bar on human approval. Move the human's attention to where it matters.
-->

---

<!-- SLIDE: CONTENT -->
# The pendulum trap — why faster ≠ better

<!-- ANIMATE: emphasis-callout (Kessler quote first), build-bullets (moat list), emphasis-callout last -->

Thomas Kessler (Linear) on the danger of agentic speed:

> *"When everybody has the capability of shipping tons of functionalities, your competition might be a small team or even one person. In that world, it becomes important to stand out — by building tasteful software, by building high-quality software."*

**The agent gives everyone speed.** That makes speed a commodity.

What's left as moat:
- Customer understanding
- Product taste (which AI does **not** have — yet)
- **Codebase quality**

Linear's framing on that surplus throughput:

> *"We've never had a codebase this good."*

**The agent does the typing. Humans do the architecture and the taste.**

That's the trade Mikael is making on Monday.

<!-- SPEAKER NOTES:
- Kessler's framing (Pragmatic Engineer interview, 2026) is the right defense against the hype: speed becomes a commodity once everyone has it. What you spend the surplus on determines whether you have a moat.
- Steve Jobs reference (Kessler also cites): "Great products come from saying no to 999 things and yes to one." With AI, the hard part is saying no.
- "AI has no taste" — Kessler is explicit: agents have no concept of time, no feel for whether a 2-second click is too slow, no instinct for animation easing. The taste layer is the human's, and that's where engineers' attention should now go.
- Spark Vision tie-in: Mikael's whole worry (18 March mail) was legacy tech limiting tempot. The agent doesn't fix legacy by itself — it gives the team time and ATTENTION to fix legacy *deliberately*, instead of always firefighting features. The next two slides show two concrete rituals that make this real.
-->

---

<!-- SLIDE: CONTENT -->
# Linear's ritual — Quality Wednesdays

<!-- ANIMATE: build-code (rule box), emphasis-callout (Kessler quote), bullet on the SV proposal -->

Every Wednesday, Linear's ~25-engineer team joins a **30-minute call**.
**Each engineer demos one quality fix they made that week.**

Range: 1-pixel UI tweak → backend perf win. Boom-boom-boom. ~2 min each.

```
Rule:  you have to FIND your own fix.
       no one hands them to you.
       you hunt.
```

The real point — the side effect, not the meeting:

> *"Everybody was always on the lookout for small quality fixes, even when building totally unrelated features. They knew they had to come to the next Wednesday meeting with a fix. So they introduced fewer regressions in the first place."*
> — Thomas Kessler, Linear

Linear has fixed **2 500–3 000** small quality details since starting the practice.

**For Spark Vision (10 devs):** a 15-min "Quality Friday" — every dev brings one self-found fix. Mikael owns. **The cheapest possible quality ratchet you can install Monday morning.**

<!-- SPEAKER NOTES:
- Origin story (Kessler): he kept reporting one-pixel-off issues to engineers. Brought the team into a focused hour on a small UI surface — found 35 problems in one menu. "I had no idea." Hence the weekly ritual.
- Mechanism: it's not the meeting that creates quality — it's the awareness it forces *between* meetings. Devs become quality-attuned because they know the demo is coming.
- "Find your own fix" matters. Hand-fed bugs don't train the eye. Self-found fixes train pattern recognition.
- For SV: 10 devs × 2 min = 20 min. Round to 15. Run during the agentic sprint week 1 to build the muscle.
- Important caveat (Kessler): "If you get assigned a bug, that doesn't count. That's a defect — bugs are separate." Quality fixes are above the bug bar. Two different rituals.
-->

---

<!-- SLIDE: CONTENT -->
# The companion discipline — zero bug policy

<!-- ANIMATE: emphasis-callout (Kessler quote first), build-rows (cost/benefit), emphasis-callout last -->

Linear's other practice: **bugs get assigned automatically the moment they're filed. The dev drops everything else and fixes them — usually within 2–3 hours.** Or explicitly decides not to (1-in-100 000 edge cases are OK to pass on).

The math (this is the kicker):

> *"Bugs are created at a constant rate. The rate at which you have to fix bugs is the same whether you fix them in two months or immediately. So all you need to do is stop new development for as long as it takes to bring your backlog to zero — then maintain."*
> — Thomas Kessler, Linear

Linear paid down their backlog over **3 weeks**, then maintained.

| Cost | Benefit |
|---|---|
| 3 weeks of no new features (one-time) | A backlog that never grows again |
| Devs interrupted by bugs as they come | Bugs fixed while context is fresh |
| Discipline to say *"fix now"* | **10 % of bugs auto-fixed by single-shot agents — 0 dev time** |

**Customer payoff:**

> *"Two hours after they report a bug, they get an email saying 'we fixed it, refresh your browser.' Users get super excited."*

**For Spark Vision:** pair zero-bug with the agentic sprint. The first 2 weeks become a backlog paydown — the agent makes "eat your vegetables" cheap enough to actually do.

<!-- SPEAKER NOTES:
- The math is the persuasion: bug-fixing cost is constant. Spread or batch — same total. So the question is *when*, not *if*. Now wins because (a) easier to fix while context is fresh, (b) backlog doesn't psychologically rot the team, (c) customers get a magic experience.
- Linear's 10%-auto-fix is real (Kessler 2026). Expected to climb toward ~100% over a few years. SV starts at 0% and climbs as the harness matures.
- For Mikael: the 2-week agentic sprint is the perfect window. Don't ship features. Pay down bugs. Build the muscle. Then maintain.
- Pairs naturally with `qa` skill (Block 9): user reports bug → qa skill files durable issue → zero-bug policy assigns it → agent or human fixes within hours.
-->

---

<!-- ============================================================ -->
<!-- CLOSING                                                       -->
<!-- ============================================================ -->

<!-- SLIDE: SECTION — dark navy bg -->
# Where we go from here
*The next two weeks*

<!-- SPEAKER NOTES:
- Time: 15:55–16:00
-->

---

<!-- SLIDE: CONTENT -->
# Mikael owns this slide

<!-- ANIMATE: emphasis-callout (the goal line first), build-rows -->

> **Goal: 1 June 2026 — the dev team works agentically.**

Not a stretch goal. The expectation.

| When | What | Owner |
|------|------|-------|
| **This week (28 Apr → 2 May)** | Every dev has an AGENTS.md for their main repo | Each dev |
| **Mon 5 May** | 2-week agentic sprint kicks off — *only* the new workflow, nothing from regular backlog | Mikael |
| **Fri 9 May** | Mid-sprint check-in: bottlenecks, blockers, AGENTS.md updates | Mikael + Per |
| **Fri 16 May** | Sprint retro. Demo what shipped. | Whole team |
| **Mon 1 June** | Production-grade or escalate. | Mikael + Fredrik T |

<!-- SPEAKER NOTES:
- THIS IS MIKAEL'S SLIDE. He delivers it. Per hands him the mic.
- The Sana 17-April summary made this explicit: Mikael owns a programpunkt, communicates the non-negotiable expectation, owns the 2-week sprint.
- "Production-grade or escalate" = the off-ramp from Martin's plan. Stated calmly, no drama.
-->

---

<!-- SLIDE: CONTENT -->
# What you take home

<!-- ANIMATE: build-bullets (one ranked takeaway at a time), emphasis-callout last -->

**The five things, in priority order:**

1. **AGENTS.md ≤ 150 lines.** Symlink for every tool you use. Add the two mandatory lines.
2. **Plan Mode → ask first.** No code until questions are answered.
3. **The loop:** Plan → Build → Simplify → Verify. Every task. Every time.
4. **One lever per problem:** AGENTS.md / Skill / Hook / Subagent / Command. Don't mix.
5. **BDD before TDD before code.** Scenarios are the contract.

> **If you only do (1) and (2): you're already shipping 4× more.**

<!-- SPEAKER NOTES:
- Numbered, ranked. People remember 5 things, not 25.
- (1) and (2) alone get you most of the gains. The rest is sharpening.
- This is the slide they photograph. Make sure it's clean.
-->

---

<!-- SLIDE: CONTENT -->
# Built on these shoulders

<!-- ANIMATE: build-rows (one foundation at a time — pacing matters here for credit), emphasis-callout last -->

Nothing here is original. Every recommendation today comes from one of these:

| Foundation | Source · year | Where today |
|---|---|---|
| **"Attention Is All You Need"** | Vaswani et al. — 2017 | Block 1 |
| **"Agent = Model + Harness"** | Mitchell Hashimoto · Martin Fowler — 2026 | Block 1 |
| **Context Rot research** | Chroma Research — 2025 | Block 1 |
| **AGENTS.md spec** | AAIF / Linux Foundation — 2025 | Block 2 |
| **AGENTS.md 4× study** | Red Hat — Apr 2026 | Block 2 |
| **`mattpocock/skills`** (Apache-2.0) | Matt Pocock — 2026 | Blocks 3 · 5 · 6 · 7 · 9 |
| **GitHub Spec Kit** (Spec-Driven Development) | Den Delimarsky · GitHub — 2025/2026 | Whole afternoon |
| **Domain-Driven Design** (ubiquitous language, bounded context) | Eric Evans — 2003 | Block 5 |
| **"A Philosophy of Software Design"** (deep modules) | John Ousterhout — 2018 | Blocks 5 · 6 |
| **"The Pragmatic Programmer"** (tracer bullets) | Hunt & Thomas — 1999 | Block 6 |
| **Behavior-Driven Development** | Dan North — 2003 | Block 7 |
| **"Test-Driven Development: By Example"** | Kent Beck — 2002 | Block 7 |
| **Linear quality playbook** (Quality Wednesdays · Zero bug policy) | Thomas Kessler (Linear) — 2026 | Block 9 |
| **Agents SDK · Copilot agent mode** | OpenAI · GitHub — 2025/2026 | All |

> **The job today wasn't to invent. It was to integrate.**

<!-- SPEAKER NOTES:
- Credits matter. The room takes recommendations more seriously when they see this isn't vibes — it's standing on 25 years of software craft + 2 years of agentic-dev practice.
- Don't read every row. Land three: Vaswani (the science behind why context matters), Beck + North (the practice tradition under BDD/TDD), Pocock (the modern open-source layer that ties it all together).
- Hashimoto coined "Agent = Model + Harness". Fowler made it canonical (April 2026 essay). That formalization is why the harness is the competitive edge — and why this whole day is about the harness.
- "The job wasn't to invent. It was to integrate." — say this out loud. It's the workshop in one sentence.
-->

---

<!-- SLIDE: CONTENT -->
# Resources

- **AGENTS.md spec** — agents.md
- **GitHub Spec Kit (SDD)** — github.com/github/spec-kit (Apache-2.0)
  - Install: `uvx --from git+https://github.com/github/spec-kit.git specify init`
  - Slash commands: `/constitution` · `/specify` · `/clarify` · `/plan` · `/tasks` · `/implement`
- **Skills library — `mattpocock/skills`** — github.com/mattpocock/skills (Apache-2.0)
  - Install per skill: `npx skills@latest add mattpocock/skills/<name>`
  - The pipeline: `grill-me` · `to-prd` · `to-issues` · `tdd` · `qa` · `domain-model` · `ubiquitous-language` · `triage-issue` · `improve-codebase-architecture` · `write-a-skill` · `git-guardrails-claude-code`
- **Claude Code docs** — docs.claude.com
- **OpenAI Agents SDK** — platform.openai.com/docs/guides/agents
- **GitHub Copilot — agent mode + prompt files** — docs.github.com/copilot
- **Red Hat 4× study** — developers.redhat.com (Apr 2026)
- **Chroma context rot research** — research.trychroma.com/context-rot
- **Cucumber / BDD** — cucumber.io
- **Monterro skill library** — internal: `monterro-deck`, `monterro-1`

Slack `#ai-team` for follow-ups. I'll be on Teams the rest of the week.

<!-- SPEAKER NOTES:
- One slide, clickable links, on screen during Q&A.
- "Slack/Teams" — adjust to whatever channel SV actually uses.
-->

---

<!-- SLIDE: QUESTION — light bg, red ❓ icon -->
# ❓ Q&A

*Ask anything. The agent will, too.*

<!-- SPEAKER NOTES:
- 5 min. Hard stop at 16:00.
- If a question is deep / specific: "Let's pair on it tomorrow." Don't burn the room's time on one issue.
-->

---

<!-- SLIDE: TITLE — dark navy bg -->
# Thank you
## Let's go ship something
Per Hassle · per.hassle@monterro.com · +46 703 93 93 33

<!-- SPEAKER NOTES:
- Last slide. Keep it in front of the room during informal chat afterwards.
- Make sure Mikael has 5 minutes 1:1 before you leave: confirm the 2-week sprint kicks off Monday.
-->

---
