# Source Code

TypeScript source code for Gemini-Kit MCP extension.

## Purpose

Core implementation of MCP tools, utilities, and extension functionality.

## Components

| Directory/File | Description |
|----------------|-------------|
| `tools/` | MCP tool implementations |
| `kit-server.ts` | Main MCP server entry point |
| `constants.ts` | Shared constants and configuration |
| `utils.ts` | Utility functions (path handling, file operations) |
| `__tests__/` | Test suite |

## Component Details

### 🔴 Critical: `kit-server.ts`
Main MCP server implementation. Registers all tools, handles requests, and manages server lifecycle.
- **Exports**: `startServer()`, tool registrations
- **Dependencies**: All tools in `tools/` directory

### 🟡 Supporting: `constants.ts`
Shared constants including file patterns, default values, and configuration.
- **Exports**: `PATTERNS`, `DEFAULTS`, `CONFIG`

### 🟡 Supporting: `utils.ts`
Utility functions for common operations.
- **Exports**: Path utilities, file helpers, string manipulation

### 🔴 Critical: `tools/`
MCP tool implementations:
- **checkpoint.ts** - Git checkpoint management
- **learning.ts** - Learning system (`kit_save_learning`, `kit_get_learnings`)
- **integration.ts** - GitHub/Jira integration
- **security.ts** - Secret detection and blocking
- **git.ts** - Git operations
- **team-state.ts** - Team coordination state

## Building

```bash
npm run build
```

## Testing

```bash
npm test
```

## Changelog

### 2026-01-24
- Added missing component entries (`kit-server.ts`, `constants.ts`, `utils.ts`)
- Added Component Details section

### 2024-12-24
- Initial documentation
