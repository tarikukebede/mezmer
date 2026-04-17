# MCP Server

Mezmer includes a repository-local MCP server for AI-assisted development workflows.

## Purpose

The MCP server turns the repository's existing contracts, docs, and validation scripts into a structured interface that MCP-capable tools can query directly.

This is useful when developers are working with AI tools that need authoritative context instead of file-system guessing.

The server helps AI tooling:

- retrieve exact component contracts and capabilities
- retrieve current theme metadata and active theme state
- read component documentation as structured context
- run repository validation checks before or after changes

## What It Exposes

Current resources and tools are implemented in `scripts/mcp-server.mjs`.

Read-only resources:

- contracts index
- active theme
- component contract by name
- component docs by name

Validation and discovery tools:

- `list_components`
- `get_component_contract`
- `list_themes`
- `get_theme_contract`
- `validate_contracts`
- `validate_component_docs`
- `validate_workspace_contract_surface`

## Why It Helps Developers

For developers using MCP-aware tools, this reduces incorrect code generation and repository spelunking.

Instead of manually checking multiple files, a tool can ask the MCP server for the source of truth and generate code aligned with:

- public props
- accessibility expectations
- access-control behavior
- theme contracts
- current validation status

This is especially useful when adding new components, updating themes, or refactoring contract-driven APIs.

## Run Locally

Start the stdio MCP server from the repository root:

```bash
pnpm mcp:server
```

Show help:

```bash
pnpm mcp:help
```

## Related Files

- `scripts/mcp-server.mjs`
- `ai/contracts/index.json`
- `ai/contracts/components/*.contract.json`
- `ai/contracts/themes/*.contract.json`
- `ai/theme.active.json`
- `scripts/validate-contracts.mjs`
- `scripts/validate-component-docs.mjs`

## Scope

The current implementation is intentionally thin and read-only by default.

It reuses the repository's existing contract and validation logic instead of introducing a second source of truth.
