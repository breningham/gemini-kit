<p align="center">
  <img src="https://img.shields.io/badge/Gemini--Kit-v0.1.0-blue?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Multi--Model-Gemini%20%7C%20Claude%20%7C%20OpenAI-purple?style=for-the-badge" alt="Multi-Model">
</p>

<h1 align="center">🚀 Gemini-Kit</h1>

<p align="center">
  <strong>Build Software Like You Have a Team</strong><br>
  ClaudeKit-style AI Development Assistant with Multi-Model Support
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-commands">Commands</a> •
  <a href="#-agents">Agents</a> •
  <a href="#-configuration">Configuration</a> •
  <a href="#-workflows">Workflows</a>
</p>

---

## ✨ Why Gemini-Kit?

**Gemini-Kit** brings the power of AI-assisted development to your command line. Instead of switching between your editor and AI chat, you get specialized AI agents that understand your codebase and help you build faster.

### 🎯 Key Benefits

| Feature | Description |
|---------|-------------|
| **15 Specialized Agents** | Each agent is an expert in its domain - planning, coding, testing, debugging, and more |
| **38+ Commands** | One command for any task - from quick fixes to full feature development |
| **Multi-Model Support** | Use Gemini, Claude, OpenAI, or CLIProxyAPI - your choice |
| **Zero Setup Friction** | Just configure your API key and start building |

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/nth5693/gemini-kit.git
cd gemini-kit

# Install dependencies
pnpm install

# Build the project
pnpm build

# Link globally (optional)
pnpm link --global
```

### Configuration

Create your config file:

```bash
mkdir -p ~/.gemini-kit
```

```json
// ~/.gemini-kit/config.json
{
  "defaultProvider": "gemini",
  "providers": {
    "gemini": {
      "apiKey": "YOUR_GEMINI_API_KEY",
      "model": "gemini-1.5-pro"
    }
  }
}
```

**Get your API key:**
- **Gemini**: [Google AI Studio](https://aistudio.google.com/apikey)
- **Claude**: [Anthropic Console](https://console.anthropic.com/)
- **OpenAI**: [OpenAI Platform](https://platform.openai.com/api-keys)

### Your First Command

```bash
# Ask about your codebase
gk ask "What does this project do?"

# Plan a new feature
gk plan feature "add user authentication"

# Search your codebase
gk scout "database"
```

---

## 📋 Commands

### Core Workflow

| Command | Description |
|---------|-------------|
| `gk cook <task>` | **All-in-one development** - Plans, implements, tests, reviews, and commits |
| `gk bootstrap <name>` | Generate a new project from scratch |
| `gk plan feature <desc>` | Create a detailed implementation plan |
| `gk code <plan-path>` | Generate code from a plan file |
| `gk scout <query>` | Search your codebase for relevant files |
| `gk ask <question>` | Ask questions about your codebase |

### Fix Commands

| Command | Description |
|---------|-------------|
| `gk fix fast` | Quick fixes (linting, formatting) |
| `gk fix hard <issue>` | Complex bug investigation |
| `gk fix types` | Fix TypeScript errors |
| `gk fix test` | Fix failing tests |
| `gk fix ui <component>` | Fix UI/UX issues |
| `gk fix ci` | Fix CI/CD pipeline issues |
| `gk fix logs [file]` | Analyze logs for errors |

### Git Commands

| Command | Description |
|---------|-------------|
| `gk git cm` | Commit with AI-generated message |
| `gk git cp` | Commit and push |
| `gk git pr <branch>` | Create a pull request |

### Design Commands

| Command | Description |
|---------|-------------|
| `gk design fast <desc>` | Quick UI mockups |
| `gk design good <desc>` | Premium, refined designs |
| `gk design 3d <desc>` | Three.js 3D scenes |
| `gk design screenshot <img>` | Convert screenshot to code |
| `gk design video <vid>` | Convert video to code |

### Content & Research

| Command | Description |
|---------|-------------|
| `gk content good <desc>` | High-quality content |
| `gk content cro <desc>` | Conversion-optimized copy |
| `gk research deep <topic>` | Deep research with sources |
| `gk research quick <topic>` | Quick topic overview |

### Database Commands

| Command | Description |
|---------|-------------|
| `gk db query <sql>` | Analyze and optimize SQL |
| `gk db optimize` | Database optimization recommendations |
| `gk db schema` | Schema analysis and suggestions |

### Integration Commands

| Command | Description |
|---------|-------------|
| `gk integrate polar` | Add Polar.sh payment integration |
| `gk integrate sepay` | Add SePay.vn payment integration |

---

## 🤖 Agents

Gemini-Kit uses **15 specialized agents**, each an expert in its domain:

### Development Agents
| Agent | Role |
|-------|------|
| **Planner** | Creates detailed implementation plans |
| **Scout** | Searches and analyzes your codebase |
| **Debugger** | Investigates and diagnoses issues |
| **Coder** | Writes production-ready code |

### Quality Agents
| Agent | Role |
|-------|------|
| **Tester** | Runs tests and validates quality |
| **Code Reviewer** | Reviews code for best practices |

### DevOps Agents
| Agent | Role |
|-------|------|
| **Git Manager** | Handles commits, pushes, and PRs |
| **Database Admin** | Optimizes queries and schemas |

### Creative Agents
| Agent | Role |
|-------|------|
| **UI/UX Designer** | Creates interface designs |
| **Brainstormer** | Explores ideas and solutions |
| **Copywriter** | Writes compelling content |

### Research Agents
| Agent | Role |
|-------|------|
| **Researcher** | Deep research with documentation |
| **Journal Writer** | Documents project journey |

### Documentation Agents
| Agent | Role |
|-------|------|
| **Docs Manager** | Maintains documentation |
| **Project Manager** | Tracks project status |

---

## ⚙️ Configuration

### Full Configuration Options

```json
{
  "defaultProvider": "gemini",
  "providers": {
    "gemini": {
      "apiKey": "your-gemini-api-key",
      "model": "gemini-1.5-pro"
    },
    "claude": {
      "apiKey": "your-claude-api-key",
      "model": "claude-3-5-sonnet-20241022"
    },
    "openai": {
      "apiKey": "your-openai-api-key",
      "model": "gpt-4o"
    },
    "cliproxy": {
      "baseURL": "http://localhost:8080/v1",
      "model": "gemini-2.5-pro"
    }
  },
  "autoCommit": false,
  "autoTest": true,
  "planApproval": true
}
```

### Using CLIProxyAPI

For free access to multiple models via [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI):

```json
{
  "defaultProvider": "cliproxy",
  "providers": {
    "cliproxy": {
      "apiKey": "cliproxy",
      "model": "gemini-2.5-pro",
      "baseURL": "http://localhost:8080/v1"
    }
  }
}
```

---

## 📖 Workflows

### Building a New Feature

```bash
# 1. Plan the feature
gk plan feature "add user authentication with OAuth"

# 2. Generate code from the plan
gk code @plans/user-auth.md

# 3. Fix any test failures
gk fix test

# 4. Commit your changes
gk git cm
```

### Debugging Production Issues

```bash
# 1. Analyze logs
gk fix logs ./logs/error.log

# 2. Deep investigation
gk fix hard "users reporting timeout errors"

# 3. Verify the fix
gk test

# 4. Commit and push
gk git cp
```

### All-in-One Development

```bash
# Let Gemini-Kit handle everything
gk cook "add shopping cart with checkout flow"

# This will:
# 1. Plan the implementation
# 2. Scout your codebase
# 3. Guide implementation
# 4. Run tests
# 5. Review code
# 6. Update docs
```

---

## 🆚 Comparison with ClaudeKit

| Feature | ClaudeKit | Gemini-Kit |
|---------|-----------|------------|
| Specialized Agents | 14 | 15 ✅ |
| Commands | 38+ | 38+ ✅ |
| Claude Support | ✅ | ✅ |
| **Gemini Support** | ❌ | ✅ |
| **OpenAI Support** | ❌ | ✅ |
| **CLIProxyAPI** | ❌ | ✅ |
| Open Source | ❌ | ✅ |

---

## 📁 Project Structure

```
gemini-kit/
├── src/
│   ├── agents/           # 15 specialized agents
│   │   ├── development/  # planner, scout, debugger, coder
│   │   ├── quality/      # tester, code-reviewer
│   │   ├── devops/       # git-manager, database-admin
│   │   ├── creative/     # ui-ux-designer, brainstormer, copywriter
│   │   ├── research/     # researcher, journal-writer
│   │   └── documentation/# docs-manager, project-manager
│   ├── commands/         # 38+ CLI commands
│   ├── providers/        # AI model providers
│   └── cli/              # CLI entry point
├── tests/                # Unit tests
├── dist/                 # Built output
└── package.json
```

---

## 🧪 Development

```bash
# Install dependencies
pnpm install

# Development mode
pnpm dev

# Build
pnpm build

# Run tests
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- Inspired by [ClaudeKit](https://docs.claudekit.cc/)
- Built with [Google Generative AI](https://ai.google.dev/)
- Supports [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)

---

<p align="center">
  <strong>Built with ❤️ for developers who want to move fast</strong>
</p>
