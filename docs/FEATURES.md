# 📚 Features Reference

Tổng hợp tất cả features của Gemini-Kit.

---

## 🤖 Agents (15)

Gemini-Kit có 15 specialized agents, mỗi agent có expertise riêng.

| Agent | Role | Khi nào dùng |
|-------|------|--------------|
| **Planner** | Tạo kế hoạch triển khai | Trước feature mới |
| **Scout** | Khám phá codebase | Hiểu code mới |
| **Coder** | Viết code sạch | Implement features |
| **Tester** | Viết tests | Đảm bảo chất lượng |
| **Reviewer** | Review code | Trước merge |
| **Debugger** | Phân tích lỗi | Khi có bugs |
| **Git Manager** | Version control | Commit, branch |
| **Copywriter** | Marketing content | Docs, copy |
| **Database Admin** | Quản lý database | Schema, queries |
| **Researcher** | External research | Tìm best practices |
| **UI Designer** | Thiết kế UI/UX | Frontend design |
| **Docs Manager** | Documentation | Update docs |
| **Brainstormer** | Ý tưởng sáng tạo | Ideation |
| **Fullstack Dev** | Full-stack | End-to-end features |
| **Project Manager** | Quản lý dự án | Planning, tracking |

---

## 🔄 Core Workflows (Top 10)

### Compound Loop

```
/explore → /plan → /work → /review → /compound → /housekeeping
```

### Essential Workflows

| Workflow | Purpose | Time |
|----------|---------|------|
| `/explore` | Deep research | 30 min |
| `/plan` | Quick planning | 15 min |
| `/plan-compound` | Comprehensive planning | 30 min |
| `/work` | Execute plan | Varies |
| `/review` | Quick review | 10 min |
| `/review-compound` | Multi-pass review | 30 min |
| `/compound` | Document solution | 10 min |
| `/housekeeping` | Pre-push cleanup | 5 min |
| `/specs` | Multi-session initiative | 1 hour |
| `/triage` | Prioritize todos | 15 min |

### Quick Commands

| Command | Purpose |
|---------|---------|
| `/status` | Project status |
| `/kit:setup` | Setup wizard |
| `/changelog` | Generate changelog |
| `/adr` | Architecture decision |

---

## 🛠️ Scripts (50+)

### Workflow Core

| Script | Purpose |
|--------|---------|
| `log-workflow.sh` | Log workflow usage |
| `pre-push-housekeeping.sh` | Pre-push checks |
| `check-docs-freshness.sh` | Doc freshness |

### Knowledge System

| Script | Purpose |
|--------|---------|
| `compound-search.sh` | Search solutions |
| `compound-dashboard.sh` | Health dashboard |
| `validate-compound.sh` | Validate system |
| `validate-patterns.sh` | Check patterns |

### Todo Management

| Script | Purpose |
|--------|---------|
| `create-todo.sh` | Create todo |
| `complete-todo.sh` | Complete todo |
| `audit-state-drift.sh` | Sync states |

---

## 🎯 Skills (7)

Modular capabilities cho agents.

| Skill | Location | Purpose |
|-------|----------|---------|
| Session Resume | `skills/session-resume/` | Resume context |
| Code Review | `skills/code-review/` | Review checklists |
| Compound Docs | `skills/compound-docs/` | Document solutions |
| Debug | `skills/debug/` | Bug investigation |
| Testing | `skills/testing/` | Test patterns |
| File Todos | `skills/file-todos/` | Todo management |
| Supabase (Example) | `skills/examples/supabase/` | DB patterns |

---

## 📊 Knowledge System

### Critical Patterns (23)

Key patterns để tránh lỗi lặp lại:

| Pattern | Summary |
|---------|---------|
| #1 | Search Before Solving |
| #2 | Actionable Items → Todo Files |
| #3 | Housekeeping Before Push |
| #8 | Rigorous Planning |
| #10 | Explore Before Plan |

[Full list](docs/solutions/patterns/critical-patterns.md)

### Solution Templates

```
docs/solutions/
├── patterns/          # Critical patterns
├── integrations/      # Integration guides
├── schema.yaml        # Validation schema
└── solution-template.md
```

---

## 🔧 MCP Tools

| Tool | Purpose |
|------|---------|
| `kit_create_checkpoint` | Git checkpoint |
| `kit_restore_checkpoint` | Restore checkpoint |
| `kit_get_project_context` | Project info |
| `kit_handoff_agent` | Agent handoff |
| `kit_save_artifact` | Save results |
| `kit_save_learning` | Save learnings |
| `kit_get_learnings` | Get learnings |

---

## 📁 Directory Structure

```
gemini-kit/
├── agents/            # 15 agent definitions
├── commands/          # Slash commands (.toml)
├── hooks/             # Lifecycle hooks
├── src/tools/         # MCP tool implementations
├── .agent/workflows/  # 32 workflow definitions
├── scripts/           # 50+ automation scripts
├── skills/            # 7 modular skills
├── docs/
│   ├── architecture/  # System design
│   ├── decisions/     # ADRs
│   ├── solutions/     # Knowledge Base
│   └── specs/         # Multi-session specs
├── plans/             # Implementation plans
└── todos/             # Tracked tasks
```
