# Contributing Guide

This package is a publishable, reusable UI component library. Contributions should preserve portability, API stability, and enterprise readiness.

## Scope And Guardrails

- Keep components presentational and data-source agnostic.
- Do not couple core components to host app routing, auth, state containers, or backend contracts.
- Keep public APIs domain-neutral and backward compatible by default.
- For authorization behavior, use injectable checks through `accessRequirements` and `resolveAccess`.

## AI-First Operating Model

The repository uses a dual-context model:

- Baseline context: human-readable docs in `README.md`, this file, and `.github/copilot-instructions.md`.
- Structured context: machine-readable contracts under `ai/contracts`.
- Required rule: structured context under `ai/contracts` must be present and consulted for all AI-assisted component work.

## Contract Workflow

1. Read `ai/contracts/index.json` before editing a component.
2. Read the component contract file in `ai/contracts/components`.
3. Keep implementation, public types, and tests aligned with contract states.
4. Update contract and tests together when behavior changes.

## Input Contract Snapshot

- Access behavior:
  - Missing `accessRequirements` or missing `resolveAccess`: input remains visible and editable unless explicitly disabled.
  - No view permission: component returns `null`.
  - View allowed and edit denied: input renders disabled.
  - Explicit `disabled` prop always keeps input disabled.
- Accessibility:
  - `aria-invalid="true"` when `error` exists.
  - Label is associated via `htmlFor` and input `id`.
- Interaction:
  - Input stops keydown propagation.
  - Consumer `onKeyDown` still executes after propagation is stopped.

## Quality Gates

Run these before merge or release:

```bash
pnpm lint
pnpm tsc --noEmit
pnpm test
pnpm build
```
