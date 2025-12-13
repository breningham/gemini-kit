# Gemini-Kit: ClaudeKit-Style AI Development Assistant

## 📊 Current Status: v0.3.1 ✅ COMPLETE

| Milestone | Status |
|-----------|--------|
| 15 Agents | ✅ Complete with Real Skills |
| 43+ Commands | ✅ Complete |
| Multi-Model | ✅ Gemini, Claude, OpenAI, CLIProxyAPI |
| Agent Skills | ✅ Level 1 + Level 2 Complete |
| AI Router | ✅ NEW - Auto Agent Selection |
| Build | 180KB |
| Tests | 9/9 ✅ |


---

## 🎯 Mục Tiêu

Xây dựng CLI tool **giống hệt ClaudeKit** nhưng hỗ trợ **multi-model** (Gemini, Claude, OpenAI).

---

## ✅ Agent Skills Upgrade (v0.3.0)

### Phase 1: Core Skills ✅
- [x] **Tester**: generateTestsForFiles() - auto-generate Vitest tests
- [x] **Debugger**: applyFix() - SEARCH/REPLACE auto-fix

### Phase 2: Enhanced Skills ✅
- [x] **Scout**: searchFileContent() + symbol extraction
- [x] **Code-Reviewer**: runEslintFix() - ESLint --fix

### Phase 3: Advanced Skills ✅
- [x] **Git-Manager**: createBranch() + generateBranchName()
- [x] **Docs-Manager**: updateReadme() capability

---

## ✅ All Completed Phases

### Phase 1: Foundation ✅
- [x] Initialize pnpm project
- [x] Setup TypeScript với strict mode
- [x] Configure tsup cho build
- [x] Setup ESLint + Prettier
- [x] Create base project structure

### Phase 2: Agent System ✅
- [x] Base agent class
- [x] Agent orchestration (Sequential, Parallel, Hybrid)
- [x] 15 Specialized Agents
- [x] Team Context Sharing

### Phase 3: Commands ✅
- [x] 43+ Slash Commands
- [x] Core workflow (cook, plan, scout)
- [x] Fix commands (fast, hard, types)
- [x] Git commands (cm, cp, pr)
- [x] Design + Content commands

### Phase 4: Polish ✅
- [x] Testing (9 tests)
- [x] Documentation (README, CHANGELOG)
- [x] CLI Proxy API Integration
- [x] Session Persistence

---

## 📁 Project Structure

```
gemini-kit/
├── src/
│   ├── agents/          # 15 Specialized Agents
│   │   ├── development/ # planner, scout, coder, debugger
│   │   ├── quality/     # tester, code-reviewer
│   │   ├── devops/      # git-manager, database-admin
│   │   ├── documentation/ # docs-manager, project-manager
│   │   ├── creative/    # brainstormer, ui-designer, copywriter
│   │   └── research/    # researcher, journal-writer
│   ├── commands/        # 43+ Commands
│   ├── providers/       # Gemini, Claude, OpenAI, CLIProxyAPI
│   └── context/         # TeamContext, SessionManager
├── tests/               # 9 Unit Tests
└── dist/                # 163KB Build
```

---

## 🆚 So Sánh với ClaudeKit

| Feature | ClaudeKit | Gemini-Kit |
|---------|-----------|------------|
| Agents | 14 | 15 ✅ |
| Commands | 38+ | 43+ ✅ |
| AI Models | Claude only | Gemini + Claude + OpenAI + CLIProxyAPI |
| Agent Skills | Basic | Real Actions ✅ |
| Test Generation | No | Yes ✅ |
| Auto-Fix | No | Yes ✅ |
| ESLint Integration | No | Yes ✅ |

---

## 🚀 Getting Started

```bash
# Install
git clone https://github.com/nth5693/gemini-kit.git
cd gemini-kit
pnpm install && pnpm build

# Configure
cat > ~/.gemini-kit/config.json << 'EOF'
{
  "defaultProvider": "cliproxy",
  "providers": {
    "cliproxy": {
      "apiKey": "your-api-key",
      "baseURL": "https://your-proxy.com/v1",
      "model": "gemini-2.5-flash"
    }
  }
}
EOF

# Link globally
pnpm link --global

# Start cooking!
gk cook "create a todo app"
```

---

## 📝 Notes

1. **Agents là CORE** - Mọi thứ xoay quanh agents
2. **Commands gọi agents** - Không tự implement logic
3. **Team Context** - Agents chia sẻ context
4. **Real Actions** - Agents thực sự thực hiện actions (write files, run tests, fix code)
