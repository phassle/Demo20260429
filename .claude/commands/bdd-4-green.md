---
description: Step 4 — Minimum code to green this test, then loop back to step 2
---

Make the red test from step 3 green. Use the **`tdd` skill** loop
(`.claude/skills/tdd/SKILL.md` § Incremental Loop):

1. Write the **smallest** implementation that turns this test green.
   No premature abstraction. No extra error handling. No scaffolding
   for tests not yet written.
2. Run the suite (`dotnet test` or `npm test -- --run`).
3. Confirm: this test is green, no previously-green test went red.
4. Show me the diff for this scenario only.
5. Stop. Wait for me to either:
   - say "next" → restart the loop at `/bdd-2-red` for the next
     scenario, or
   - say "done" → all scenarios covered, move to `/bdd-5-review`.

If a test forces a design decision (which class owns this method?
what should the return type be?) — surface the decision, don't guess.
See `.claude/skills/tdd/deep-modules.md` for what makes a good
boundary.

**Don't refactor while red. Don't refactor while making green.**
Refactoring happens only after all scenarios are green —
`.claude/skills/tdd/refactoring.md` covers that pass.
