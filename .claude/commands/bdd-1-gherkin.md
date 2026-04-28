---
description: Step 1 — Generate Gherkin scenarios for the current Spec
---

Generate Gherkin scenarios for this Spec.

Cover:
- 1 happy path
- 3 edge cases
- 1 stop-rule scenario (something the system should refuse to do)

Save to `docs/bdd/<feature>.feature`. Pick `<feature>` from the Spec's
title (kebab-case, no extension). Create `docs/bdd/` if it doesn't
exist.

Use the `Feature: …` / `Scenario: …` / `Given … / When … / Then …`
format. Reuse domain terms from `docs/ubiquitous_language.md` (or
`AGENTS.md`) — never invent synonyms.

End with: a one-line summary of what's covered and any unresolved
questions about scenario boundaries.

> Next: `/bdd-2-red` — but read it first; it commits us to a
> vertical-slicing loop, not "all tests red, then all green".
