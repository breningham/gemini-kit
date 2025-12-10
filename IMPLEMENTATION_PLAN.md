# Gemini-Kit: ClaudeKit-Style AI Development Assistant

## 🎯 Mục Tiêu

Xây dựng CLI tool **giống hệt ClaudeKit** nhưng hỗ trợ **multi-model** (Gemini, Claude, OpenAI).

---

## 📐 Kiến Trúc ClaudeKit (Reference)

```
ClaudeKit/
├── 14 Specialized Agents (CORE)     ← Trung tâm của hệ thống
│   ├── planner           - Nghiên cứu, tạo implementation plans
│   ├── scout             - Tìm kiếm files nhanh qua parallel search
│   ├── debugger          - Điều tra issues, phân tích logs
│   ├── tester            - Validate code qua comprehensive testing
│   ├── code-reviewer     - Code review và quality assessment
│   ├── docs-manager      - Quản lý technical documentation
│   ├── project-manager   - Project oversight và coordination
│   ├── ui-ux-designer    - Design interfaces, wireframes
│   ├── copywriter        - High-converting marketing copy
│   ├── brainstormer      - Explore ideas, debate decisions
│   ├── researcher        - Multi-source research, best practices
│   ├── journal-writer    - Document technical difficulties
│   ├── git-manager       - Stage, commit, push với standards
│   └── database-admin    - Database optimization, query analysis
│
├── Agent Orchestration
│   ├── Sequential        - planner → code → tester → reviewer
│   ├── Parallel          - Multiple scouts search independently
│   └── Hybrid            - Parallel scouts → Sequential planning
│
├── 38+ Slash Commands
│   ├── /cook             - All-in-one (invokes multiple agents)
│   ├── /bootstrap        - Project generation
│   ├── /plan             - Invokes planner agent
│   ├── /scout            - Invokes scout agent
│   ├── /test             - Invokes tester agent
│   ├── /fix              - Smart router → appropriate agent
│   └── ...
│
└── CLI (ck command)
```

---

## 📁 Cấu Trúc Dự Án Gemini-Kit

```
gemini-kit/
├── src/
│   ├── cli/                    # CLI entry point
│   │   ├── index.ts
│   │   └── commands/           # CLI command handlers
│   │
│   ├── agents/                 # 14 SPECIALIZED AGENTS (CORE)
│   │   ├── base-agent.ts       # Base agent class
│   │   ├── agent-registry.ts   # Agent registration
│   │   ├── orchestrator.ts     # Agent orchestration
│   │   │
│   │   ├── development/        # Development agents
│   │   │   ├── planner.ts
│   │   │   ├── scout.ts
│   │   │   ├── coder.ts
│   │   │   └── debugger.ts
│   │   │
│   │   ├── quality/            # Quality agents
│   │   │   ├── tester.ts
│   │   │   └── code-reviewer.ts
│   │   │
│   │   ├── documentation/      # Documentation agents
│   │   │   ├── docs-manager.ts
│   │   │   ├── project-manager.ts
│   │   │   └── journal-writer.ts
│   │   │
│   │   ├── creative/           # Creative agents
│   │   │   ├── ui-ux-designer.ts
│   │   │   ├── copywriter.ts
│   │   │   └── brainstormer.ts
│   │   │
│   │   ├── research/           # Research agents
│   │   │   └── researcher.ts
│   │   │
│   │   └── devops/             # DevOps agents
│   │       ├── git-manager.ts
│   │       └── database-admin.ts
│   │
│   ├── commands/               # Slash commands (invoke agents)
│   │   ├── workflow/           # Core workflow
│   │   │   ├── cook.ts         # → planner + coder + tester + reviewer
│   │   │   ├── bootstrap.ts    # → researcher + planner + coder
│   │   │   ├── plan.ts         # → planner
│   │   │   └── ...
│   │   ├── fix/                # Fix commands
│   │   ├── git/                # Git commands
│   │   ├── design/             # Design commands
│   │   └── ...
│   │
│   ├── providers/              # AI Model Providers
│   │   ├── base-provider.ts
│   │   ├── gemini.ts
│   │   ├── claude.ts
│   │   └── openai.ts
│   │
│   ├── context/                # Shared context system
│   │   ├── context-manager.ts
│   │   └── handoff.ts          # Agent handoff protocols
│   │
│   └── utils/
│       ├── config.ts
│       ├── logger.ts
│       └── file-utils.ts
│
├── .gemini-kit/                # Project-level config (like .claude/)
│   ├── config.json
│   ├── agents/                 # Custom agent definitions
│   └── commands/               # Custom commands
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗓️ Kế Hoạch Triển Khai (14 Days)

### Phase 1: Foundation (Day 1-3)

#### Day 1: Project Setup
- [ ] Initialize pnpm project
- [ ] Setup TypeScript với strict mode
- [ ] Configure tsup cho build
- [ ] Setup ESLint + Prettier
- [ ] Create base project structure

#### Day 2: AI Providers
- [ ] Implement base provider interface
- [ ] Gemini provider
- [ ] Claude provider
- [ ] OpenAI provider
- [ ] Provider selection logic

#### Day 3: CLI Framework
- [ ] Setup Commander.js
- [ ] Create gk command entry point
- [ ] Basic command routing
- [ ] Configuration system
- [ ] Logger setup

---

### Phase 2: Agent System (Day 4-8) ⭐ CORE

#### Day 4: Agent Architecture
- [ ] Base agent class với:
  - State management
  - Context access
  - Tool invocation
  - Report generation
- [ ] Agent registry
- [ ] Agent lifecycle management

#### Day 5: Agent Orchestration
- [ ] Sequential execution pattern
- [ ] Parallel execution pattern
- [ ] Hybrid orchestration
- [ ] Context sharing between agents
- [ ] Handoff protocols

#### Day 6-7: Development Agents
- [ ] **planner** - Research, analysis, implementation plans
- [ ] **scout** - Fast parallel file search
- [ ] **coder** - Code generation (nếu cần)
- [ ] **debugger** - Issue investigation, log analysis

#### Day 8: Quality + DevOps Agents
- [ ] **tester** - Test generation, execution
- [ ] **code-reviewer** - Code review, quality assessment
- [ ] **git-manager** - Git operations
- [ ] **database-admin** - DB operations

---

### Phase 3: Commands (Day 9-11)

#### Day 9: Core Workflow Commands
- [ ] /cook - All-in-one (planner → coder → tester → reviewer)
- [ ] /bootstrap - Project generation
- [ ] /plan - Planning only
- [ ] /scout - File search

#### Day 10: Fix + Git Commands
- [ ] /fix (smart router)
- [ ] /fix:fast, /fix:hard, /fix:types, /fix:ui, /fix:ci
- [ ] /git:commit, /git:cp, /git:pr

#### Day 11: Design + Content Commands
- [ ] /design:fast, /design:good
- [ ] /content:good, /content:cro
- [ ] /docs:init, /docs:update

---

### Phase 4: Creative + Research Agents (Day 12-13)

#### Day 12
- [ ] **ui-ux-designer** - UI/UX design generation
- [ ] **copywriter** - Marketing copy
- [ ] **brainstormer** - Idea exploration

#### Day 13
- [ ] **researcher** - Deep research
- [ ] **journal-writer** - Development journaling
- [ ] **docs-manager** - Documentation management
- [ ] **project-manager** - Project coordination

---

### Phase 5: Polish (Day 14)

- [ ] Testing
- [ ] Documentation
- [ ] README (EN + VI)
- [ ] Example workflows
- [ ] Bug fixes

---

## 🆚 So Sánh

| Feature | ClaudeKit | Gemini-Kit |
|---------|-----------|------------|
| Specialized Agents | 14 | 14 (giống hệt) |
| Agent Orchestration | ✅ | ✅ |
| Commands | 38+ | 38+ (giống hệt) |
| AI Model | Claude only | Gemini + Claude + OpenAI |
| CLI Command | `ck` | `gk` |

---

## 📝 Notes

1. **Agents là CORE** - Mọi thứ xoay quanh agents
2. **Commands chỉ là wrapper** - Commands gọi agents, không tự implement logic
3. **Context sharing** - Agents chia sẻ context qua orchestrator
4. **Handoff protocols** - Agent này chuyển giao cho agent khác

---

## 🚀 Getting Started (sau khi hoàn thành)

```bash
# Install
npm install -g gemini-kit

# Initialize in project
gk init

# Start cooking
gk cook "implement user authentication"

# Use specific agent
gk plan "design API architecture"
gk scout "authentication files"
gk test "run all tests"
```
