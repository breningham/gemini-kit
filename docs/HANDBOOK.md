# 📚 Gemini-Kit Handbook

> **Sổ tay tham chiếu nhanh** cho Gemini-Kit v4.0  
> 27 Agents | 33 Workflows | 14 Skills | 44 Commands

---

## 🚀 Quick Start (30 giây)

```bash
# 5 lệnh dùng nhiều nhất
/status           # Kiểm tra project
/explore [topic]  # Nghiên cứu trước khi code
/plan [task]      # Lập kế hoạch chi tiết
/work             # Thực thi theo plan
/review           # Review code trước commit
```

### Workflow cơ bản

```
/explore → /plan → /work → /review → /compound → /housekeeping
   ↓         ↓        ↓        ↓          ↓            ↓
Research  Planning  Execute  Review   Document     Cleanup
```

---

## 📋 Command Cheatsheet

### Development

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/code` | Viết code | `/code Create UserService` |
| `/cook` | Full cycle (plan→code→test→review) | `/cook Add login` |
| `/debug` | Debug issues | `/debug API returns 500` |
| `/fix` | Quick fix | `/fix ESLint errors` |
| `/test` | Viết tests | `/test UserService` |
| `/fullstack` | End-to-end feature | `/fullstack Dashboard` |

### Documentation

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/doc` | Update folder docs | `/doc src/services` |
| `/docs` | Generate docs | `/docs API reference` |
| `/adr` | Architecture Decision | `/adr Use PostgreSQL` |
| `/changelog` | Generate changelog | `/changelog` |

### Git & PR

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/git` | Git operations | `/git commit "feat: add auth"` |
| `/pr` | Create PR | `/pr Create feature PR` |
| `/review-pr` | Review PR | `/review-pr 123` |

### Research

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/scout` | Explore codebase | `/scout src/` |
| `/research` | Research tech | `/research React vs Vue` |
| `/brainstorm` | Brainstorm ideas | `/brainstorm Auth approaches` |

---

## 🤖 Agent Menu (27 Agents)

### Core Development

| Agent | Chuyên môn | Khi nào dùng |
|-------|------------|--------------|
| 📋 `planner` | Lập kế hoạch | Bắt đầu feature mới |
| 🔍 `scout` | Khám phá codebase | Tìm hiểu code existing |
| 💻 `coder` | Viết code | Implement features |
| 🧪 `tester` | Testing | Viết unit/integration tests |
| 👀 `reviewer` | Code review | Review trước merge |

### Specialists

| Agent | Chuyên môn | Khi nào dùng |
|-------|------------|--------------|
| ⚛️ `frontend-specialist` | React, Next.js, UI | Frontend development |
| 🖥️ `backend-specialist` | API, Database | Backend development |
| 🔐 `security-auditor` | OWASP, Security | Security reviews |
| 🐛 `debugger` | Root cause analysis | Debug lỗi phức tạp |
| 📱 `mobile-developer` | React Native, Flutter | Mobile apps |
| 🎮 `game-developer` | Unity, Godot | Game development |
| 🚀 `devops-engineer` | CI/CD, K8s | Infrastructure |
| 🗄️ `database-admin` | Schema, migrations | Database work |
| ⚡ `performance-optimizer` | Web Vitals, profiling | Performance issues |

### Support & Management

| Agent | Chuyên môn | Khi nào dùng |
|-------|------------|--------------|
| 🎨 `ui-designer` | UI/UX design | Design work |
| 🌐 `fullstack-developer` | Full-stack | End-to-end features |
| 🔀 `git-manager` | Git operations | Version control |
| 📝 `docs-manager` | Documentation | README, API docs |
| 🔬 `researcher` | Research | Technology decisions |
| 💡 `brainstormer` | Ideas | Problem solving |
| 📊 `project-manager` | Sprint planning | Project management |
| 👤 `product-owner` | Requirements, backlog | Product decisions |
| ✍️ `copywriter` | Marketing copy | Content |

### Specialized

| Agent | Chuyên môn | Khi nào dùng |
|-------|------------|--------------|
| 🎯 `orchestrator` | Multi-agent coordination | Complex tasks |
| 🏺 `code-archaeologist` | Legacy code | Refactoring old code |
| 🔓 `penetration-tester` | Security testing | Pentest |
| 📈 `seo-specialist` | SEO/GEO | SEO optimization |

### Cách sử dụng

```bash
> Use the security-auditor agent to review auth
> Use the frontend-specialist to optimize components
> Use the debugger agent to find root cause
```

---

## 📝 Workflow Decision Tree

```
Bạn muốn làm gì?
│
├── 🆕 Bắt đầu feature mới
│   └── /explore → /plan → /work → /review
│
├── 🐛 Fix bug
│   └── /debug (hoặc reproduce-bug → debug)
│
├── 📖 Review code
│   └── /review-compound
│
├── 📦 Commit & Push
│   └── /housekeeping → git push
│
├── 📚 Document solution
│   └── /compound
│
├── 📋 Tạo spec cho big feature
│   └── /specs
│
└── 🔍 Research trước khi decide
    └── /explore
```

### Workflow chi tiết

| Workflow | Mục đích | File |
|----------|----------|------|
| `explore` | Deep research trước planning | `.agent/workflows/explore.md` |
| `plan-compound` | Tạo plan với solution search | `.agent/workflows/plan-compound.md` |
| `work` | Execute plan step-by-step | `.agent/workflows/work.md` |
| `review-compound` | Multi-pass code review | `.agent/workflows/review-compound.md` |
| `compound` | Document solution cho reuse | `.agent/workflows/compound.md` |
| `housekeeping` | Cleanup trước git push | `.agent/workflows/housekeeping.md` |
| `triage` | Triage review findings | `.agent/workflows/triage.md` |
| `specs` | Multi-session specifications | `.agent/workflows/specs.md` |
| `adr` | Architecture Decision Record | `.agent/workflows/adr.md` |
| `cycle` | Full workflow cycle | `.agent/workflows/cycle.md` |

---

## 🛠️ Skills Reference (14 Skills)

### Frontend

| Skill | Nội dung | Agents sử dụng |
|-------|----------|----------------|
| `react-patterns` | Hooks, state, composition | frontend-specialist |
| `nextjs` | App Router, Server Components | frontend-specialist |
| `tailwind` | Tailwind CSS v4, responsive | frontend-specialist, ui-designer |
| `performance` | Core Web Vitals, optimization | performance-optimizer |

### Backend

| Skill | Nội dung | Agents sử dụng |
|-------|----------|----------------|
| `api-design` | RESTful, validation, rate limiting | backend-specialist |
| `docker` | Multi-stage builds, Compose | devops-engineer |
| `security` | OWASP Top 10, JWT, XSS/CSRF | security-auditor |

### Mobile & Testing

| Skill | Nội dung | Agents sử dụng |
|-------|----------|----------------|
| `mobile` | React Native, Flutter | mobile-developer |
| `testing` | Vitest, MSW, snapshot | tester |

### Workflow

| Skill | Nội dung | Agents sử dụng |
|-------|----------|----------------|
| `code-review` | Review checklist, patterns | reviewer |
| `debug` | 4-phase debugging methodology | debugger |
| `session-resume` | Context recovery | All |
| `compound-docs` | Knowledge documentation | All |
| `file-todos` | Task tracking | All |

---

## 📜 Scripts Quick Reference

### Health & Metrics

| Script | Mục đích | Cách dùng |
|--------|----------|-----------|
| `compound-dashboard.sh` | System health check | `./scripts/compound-dashboard.sh` |
| `compound-metrics.sh` | Metrics report | `./scripts/compound-metrics.sh` |
| `compound-search.sh` | Search solutions | `./scripts/compound-search.sh "keyword"` |

### Maintenance

| Script | Mục đích | Cách dùng |
|--------|----------|-----------|
| `validate-folder-docs.sh` | Validate docs | `./scripts/validate-folder-docs.sh` |
| `audit-solution-freshness.sh` | Check stale solutions | `./scripts/audit-solution-freshness.sh` |
| `update-solution-ref.sh` | Update solution refs | `./scripts/update-solution-ref.sh <path>` |

### Utilities

| Script | Mục đích | Cách dùng |
|--------|----------|-----------|
| `create-todo.sh` | Create todo file | `./scripts/create-todo.sh p2 "desc"` |
| `log-workflow.sh` | Log workflow usage | `./scripts/log-workflow.sh "/plan"` |
| `generate-changelog.js` | Generate changelog | `node scripts/generate-changelog.js` |

---

## 🔧 MCP Tools

### Core

| Tool | Function |
|------|----------|
| `kit_create_checkpoint` | Tạo checkpoint trước khi sửa |
| `kit_restore_checkpoint` | Rollback về checkpoint |
| `kit_get_project_context` | Lấy thông tin project |
| `kit_handoff_agent` | Chuyển context giữa agents |

### Knowledge

| Tool | Function |
|------|----------|
| `kit_save_learning` | Lưu feedback để AI học |
| `kit_get_learnings` | Đọc learnings đã lưu |
| `kit_index_codebase` | Index codebase cho search |
| `kit_keyword_search` | Search trong codebase |

---

## 🔗 Deep Links

| Tài liệu | Mô tả | Path |
|----------|-------|------|
| README | Project overview | `README.md` |
| Quick Start | Hướng dẫn cài đặt | `QUICKSTART.md` |
| API Reference | MCP tools API | `docs/API.md` |
| Security | Security features | `SECURITY.md` |
| Compound System | Knowledge system | `docs/architecture/compound-system.md` |
| Critical Patterns | 23 patterns quan trọng | `docs/solutions/patterns/critical-patterns.md` |
| Best Practices | Coding best practices | `docs/BEST-PRACTICES.md` |

---

## 📊 Stats (v4.0.0)

| Metric | Value |
|--------|-------|
| Agents | 27 |
| Workflows | 33 |
| Skills | 14 |
| Commands | 44 |
| Scripts | 47 |
| Tests | 291 passing |
| Coverage | ~81% |

---

> **Tip**: Dùng `Ctrl+F` để search nhanh trong file này!

