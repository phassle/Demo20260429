# AGENTS.md

This is a workshop teaching artefact for agentic-development practices. The
running app is a kitchen configurator under `showroom/`. Treat this repo as
production-grade in shape but demo-grade in scope.

## Tech stack

- **Frontend (`showroom/`)** — React 18 + TypeScript + Vite + react-three-fiber
- **Backend** — not implemented yet; future `backend/` would be C# / .NET
- **Issues** — GitHub Issues on `phassle/Demo20260429`

## Commands

- Frontend dev: `cd showroom && npm install && npm run dev`
- Frontend build: `cd showroom && npm run build`
- Lint / format — none configured yet (TODO via `setup-pre-commit` skill)

## Stop rules

- Never modify `showroom/src/three/` (3D rendering pipeline) without review.
- Never push directly to the default branch (`develop`) — open a PR instead.
- Never commit anything in `ws*.md` or files containing customer-specific
  identifiers (this repo is intentionally depersonalised).
- If unsure: stop and ask.

## Style

- Be extremely concise. Sacrifice grammar for concision.
- At the end of each plan, list unresolved questions (if any).

## Agent skills

### Issue tracker

Issues live in GitHub Issues on `phassle/Demo20260429`. Use the `gh` CLI for
all operations. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles, default vocabulary (`needs-triage`, `needs-info`,
`ready-for-agent`, `ready-for-human`, `wontfix`). All five labels exist on
the GitHub repo. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: one `CONTEXT.md` + `docs/adr/` at repo root (both
created lazily by `/grill-with-docs` when concepts and decisions need to be
recorded). See `docs/agents/domain.md`.

## Skills installed

`.agents/skills/` (symlinked from `.claude/skills/`):

- **Planning / spec** — `grill-me`, `grill-with-docs`, `to-prd`,
  `to-issues`, `triage`, `zoom-out`
- **Build** — `tdd`, `improve-codebase-architecture`
- **Debug** — `diagnose`
- **Tooling / meta** — `setup-matt-pocock-skills`, `setup-pre-commit`,
  `git-guardrails-claude-code`, `write-a-skill`, `caveman`

## Slash commands

`.claude/commands/` — workshop demo flow:

- `/bdd-1-gherkin` → `/bdd-2-red` → `/bdd-3-confirm-red` →
  `/bdd-4-green` → `/bdd-5-review` (vertical-slicing TDD loop wrapping
  Pocock's `tdd` skill)
