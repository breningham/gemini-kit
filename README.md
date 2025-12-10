# Gemini-Kit 🚀

> ClaudeKit-style AI Development Assistant with multi-model support

[![npm version](https://badge.fury.io/js/gemini-kit.svg)](https://www.npmjs.com/package/gemini-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🤖 **14 Specialized Agents** - ClaudeKit architecture
- 🔄 **Agent Orchestration** - Sequential, Parallel, Hybrid patterns
- 🚀 **Multi-Model Support** - Gemini, Claude, OpenAI
- 📋 **Full Workflow** - `/cook` runs complete development cycle

## Installation

```bash
npm install -g gemini-kit
# or
pnpm add -g gemini-kit
```

## Quick Start

```bash
# Initialize in your project
gk init

# Full development workflow
gk cook "add user authentication"

# Create implementation plan
gk plan "new feature description"

# Search codebase
gk scout "auth related files"
```

## All Commands

### Core Workflow
| Command | Description |
|---------|-------------|
| `gk cook <task>` | All-in-one workflow (planner → code → test → review → docs → git) |
| `gk plan <feature>` | Create implementation plan |
| `gk scout <query>` | Search codebase |
| `gk init` | Initialize project |

### Development
| Command | Description |
|---------|-------------|
| `gk test` | Run tests |
| `gk debug <issue>` | Debug issues |
| `gk fix fast` | Quick fixes (lint/format) |
| `gk fix hard <issue>` | Complex debugging |
| `gk fix types` | Fix TypeScript errors |

### Git
| Command | Description |
|---------|-------------|
| `gk git cm` | Commit with AI message |
| `gk git cp` | Commit and push |
| `gk git pr <branch>` | Create pull request |

### Documentation
| Command | Description |
|---------|-------------|
| `gk docs init` | Initialize docs |
| `gk docs update` | Update documentation |

### Design
| Command | Description |
|---------|-------------|
| `gk design fast <desc>` | Quick UI mockups |
| `gk design good <desc>` | Premium designs |

### Content
| Command | Description |
|---------|-------------|
| `gk content good <desc>` | High-quality content |
| `gk content cro <desc>` | CRO-optimized copy |

### Research
| Command | Description |
|---------|-------------|
| `gk research deep <topic>` | Deep research with saved output |
| `gk research quick <topic>` | Quick overview |

### Other
| Command | Description |
|---------|-------------|
| `gk brainstorm <topic>` | Explore ideas |
| `gk journal` | Write dev journal |
| `gk watzup` | Project status |

## The 14 Agents

| Category | Agents |
|----------|--------|
| **Development** | planner, scout, debugger |
| **Quality** | tester, code-reviewer |
| **DevOps** | git-manager, database-admin |
| **Documentation** | docs-manager, project-manager |
| **Creative** | brainstormer, ui-ux-designer, copywriter |
| **Research** | researcher, journal-writer |

## Configuration

Set your API keys:

```bash
export GEMINI_API_KEY="your-key"
export ANTHROPIC_API_KEY="your-key"
export OPENAI_API_KEY="your-key"
```

Or use `gk init` for interactive setup.

## Development

```bash
# Clone
git clone https://github.com/yourusername/gemini-kit.git
cd gemini-kit

# Install
pnpm install

# Build
pnpm build

# Test
pnpm test:run

# Link globally
pnpm link --global
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT © [Hieu](https://github.com/yourusername)
