---
description: Step 5 — All green? Review the diff before opening a PR
---

All scenarios green? Review the full diff before opening a PR.

Review approach: spawn a **subagent** (own context window, fresh desk)
so this review doesn't pollute the build conversation. Give it the
diff via `git diff` (or `git diff main...HEAD` on a branch) plus
read-only access to the repo for cross-references.

The subagent should check:

- **Stop-rule areas touched?** (rendering pipeline, asset bridge,
  database migrations, `showroom/` if backend-only sprint,
  `unity/` always.) See the project root `AGENTS.md`.
- **Tests cover every scenario in the .feature file?** Any scenario
  without a test is a gap. Reference `docs/bdd/<feature>.feature`.
- **Tests assert external behavior, not implementation details?**
  See `.claude/skills/tdd/tests.md` for the standard.
- **Mocks don't reach into internals?** See
  `.claude/skills/tdd/mocking.md`.
- **Lint / format clean?** Hooks should already enforce — verify.
- **AGENTS.md rules followed?** List any deviations.
- **Refactor opportunities?** Run the `refactoring.md` checklist
  (now that we're all-green) before declaring done.

Output: a markdown table — finding, severity, file:line — plus a
top-line `READY` / `NOT READY` verdict.

If `NOT READY`: list the specific things blocking PR merge, in
priority order. Don't fix them automatically — that's a separate
decision for the human.

If `READY`: list any optional polish suggestions, then stop.

> Optional next step: trigger `/triage` (Pocock's triage skill, in
> `.claude/skills/triage/SKILL.md`) to move the originating issue
> through the right state on the issue tracker.
