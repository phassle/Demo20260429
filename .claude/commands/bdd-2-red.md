---
description: Step 2 — Write the FIRST failing test (vertical slice, per Pocock's tdd skill)
---

Use the **`tdd` skill** (`.claude/skills/tdd/SKILL.md`) for the rest of
this loop. Read it before writing any test.

> **Important — vertical slicing.** Pocock's `tdd` skill explicitly
> warns against writing all tests up front (he calls it "horizontal
> slicing — produces crap tests"). The slide's "convert each scenario
> into a failing test" works only if interpreted as a loop:
> *write ONE test → make it green → repeat.* That's what we'll do.

Pick the FIRST scenario in the most recently generated `.feature` file
(start with the happy path).

Detect the target stack:

- **Backend** (`backend/` exists, `.csproj` files present):
  - xUnit + FluentAssertions
  - Place tests under `<Project>.Tests/` mirroring the production
    folder
  - Mock external dependencies — see `.claude/skills/tdd/mocking.md`
    for guidelines (don't mock internal collaborators)

- **Frontend** (`showroom/` or `frontend/` with
  `vite.config.ts`):
  - Vitest + `@testing-library/react`
  - If Vitest isn't installed, add it as a dev dependency and wire
    `"test": "vitest"` into `package.json`
  - Place tests next to the code as `*.test.ts(x)`
  - Mock external dependencies with `vi.mock(...)`

Write **only the test for the first scenario.** Do not stub the
others. The test must fail because behavior isn't implemented yet —
not because the code doesn't compile.

Show me the diff. End with: which scenario this is, and any unresolved
questions about the test boundary or interface design (see
`.claude/skills/tdd/interface-design.md`).
