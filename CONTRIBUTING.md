# Contributing to Gemini-Kit

Thank you for your interest in contributing!

## Development Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/gemini-kit.git
cd gemini-kit

# Install dependencies
pnpm install

# Build
pnpm build

# Run tests
pnpm test:run

# Link locally for testing
pnpm link --global
```

## Project Structure

```
src/
├── agents/           # 14 specialized agents
│   ├── development/  # planner, scout, debugger
│   ├── quality/      # tester, code-reviewer
│   ├── devops/       # git-manager, database-admin
│   ├── documentation/# docs-manager, project-manager
│   ├── creative/     # brainstormer, ui-ux-designer, copywriter
│   └── research/     # researcher, journal-writer
├── commands/         # CLI command implementations
├── providers/        # AI provider adapters (Gemini, Claude, OpenAI)
├── context/          # Shared context management
└── utils/            # Config, logger utilities
```

## Adding a New Command

1. Create command file in `src/commands/`
2. Export command function
3. Register in `src/cli/index.ts`
4. Add tests in `tests/`

## Adding a New Agent

1. Create agent file extending `BaseAgent`
2. Implement `execute()` method
3. Export from category index
4. Register with orchestrator if needed

## Code Style

- ESLint + Prettier
- TypeScript strict mode
- Conventional commits

## Pull Request Process

1. Fork the repo
2. Create feature branch
3. Write tests
4. Submit PR with description

## License

MIT
