# 🚀 Gemini-Kit

<div align="center">

[![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)](https://github.com/nth5693/gemini-kit/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-291%20passed-brightgreen.svg)]()
[![Agents](https://img.shields.io/badge/AI%20Agents-15-purple.svg)]()
[![Commands](https://img.shields.io/badge/Commands-42-orange.svg)]()

### 🎯 Biến Terminal Thành Đội Ngũ AI Engineers

**Gemini-Kit** là extension cho [Gemini CLI](https://github.com/google-gemini/gemini-cli) mang đến **15 AI agents chuyên biệt** giúp bạn code nhanh hơn 10 lần.

🌐 **Ngôn ngữ:** [English](README.md) | [Tiếng Việt](README.vi.md)

[🚀 Cài Đặt Ngay](#-cài-đặt) • [📖 Hướng Dẫn](#-cách-sử-dụng) • [🤖 Agents](#-danh-sách-agents) • [⌨️ Commands](#️-tất-cả-commands) • [📚 API](docs/API.md)

</div>

---

## 📋 Mục Lục

- [Gemini-Kit là gì?](#-gemini-kit-là-gì)
- [Cách hoạt động](#-cách-hoạt-động)
- [Lợi ích](#-lợi-ích)
- [Cài đặt](#-cài-đặt)
- [Cách sử dụng](#-cách-sử-dụng)
- [Danh sách Agents](#-danh-sách-agents)
- [Tất cả Commands](#️-tất-cả-commands)
- [MCP Tools](#-mcp-tools)
- [FAQ](#-faq)

---

## 🤔 Gemini-Kit là gì?

**Gemini-Kit** là một extension mở rộng cho Gemini CLI, biến terminal của bạn thành một **phòng kỹ thuật ảo** với 15 AI agents chuyên biệt. Mỗi agent có một vai trò riêng biệt:

| Agent | Vai trò |
|-------|---------|
| 📋 **Planner** | Lập kế hoạch, chia nhỏ tasks |
| 🔍 **Scout** | Khám phá và phân tích codebase |
| 💻 **Coder** | Viết code sạch, hiệu quả |
| 🧪 **Tester** | Tạo unit tests, integration tests |
| 👀 **Reviewer** | Review code, tìm bugs |
| 🐛 **Debugger** | Debug lỗi phức tạp |
| 🔀 **Git Manager** | Quản lý Git, commits, branches |
| 🗄️ **Database Admin** | Schema design, queries |
| 🔬 **Researcher** | Research công nghệ mới |
| 🎨 **UI Designer** | Thiết kế UI/UX |
| 📝 **Docs Manager** | Viết documentation |
| 💡 **Brainstormer** | Brainstorm ý tưởng |
| 🌐 **Fullstack Dev** | End-to-end development |
| 📊 **Project Manager** | Quản lý dự án |
| ✍️ **Copywriter** | Viết marketing content |

### Điểm nổi bật

- **42 slash commands** cho mọi tình huống
- **One-command workflow**: `/cook` = Plan → Scout → Code → Test → Review
- **Auto-checkpoint**: Tự động backup trước khi thay đổi
- **Learning System**: AI học từ feedback của bạn
- **Security Hooks**: Chặn leak secrets (30+ patterns)

---

## ⚙️ Cách Hoạt Động

```
┌─────────────────────────────────────────────────────────────────┐
│                        GEMINI-KIT ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   GEMINI     │───▶│  GEMINI-KIT  │───▶│  MCP SERVER  │      │
│  │     CLI      │    │  EXTENSION   │    │  (15 Tools)  │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │  42 COMMANDS │    │   15 AGENTS  │    │    HOOKS     │      │
│  │  /cook /plan │    │ Planner,Coder│    │ before-tool  │      │
│  │  /scout /test│    │ Tester,Scout │    │ after-tool   │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Quy trình hoạt động

1. **User gõ lệnh** (ví dụ: `/cook Add login feature`)
2. **Gemini CLI** đọc lệnh từ `commands/*.toml`
3. **Extension** chọn agent phù hợp từ `agents/*.md`
4. **MCP Server** cung cấp tools (checkpoint, handoff, learning)
5. **Hooks** chạy trước/sau mỗi action (security check, auto-test)

### Workflow `/cook` (Full Development Cycle)

```
📋 PLAN     →  🔍 SCOUT   →  💻 CODE    →  🧪 TEST    →  👀 REVIEW
Create      Find relevant   Implement    Write &      Code review
plan        files           solution     run tests   & quality
```

---

## 💎 Lợi Ích

<table>
<tr>
<td width="50%">

### ❌ Trước khi có Gemini-Kit

```
😩 Code một mình, không ai support
😩 Debug hàng giờ không ra nguyên nhân
😩 Quên viết tests, technical debt
😩 Commit lộ API key lên GitHub
😩 Lặp đi lặp lại workflow thủ công
😩 Onboard dự án mới mất cả tuần
```

</td>
<td width="50%">

### ✅ Sau khi có Gemini-Kit

```
🚀 15 AI agents hỗ trợ 24/7
🚀 Debugger agent tìm root cause
🚀 Tester agent viết tests tự động
🚀 Block secrets TRƯỚC khi commit
🚀 /cook tự động làm hết workflow
🚀 /scout phân tích codebase trong phút
```

</td>
</tr>
</table>

### Tiết kiệm thời gian

| Task | Thủ công | Với Gemini-Kit |
|------|----------|----------------|
| Phân tích codebase mới | 2-4 giờ | 5 phút (`/scout`) |
| Lập kế hoạch feature | 1-2 giờ | 10 phút (`/plan`) |
| Implement + Test + Review | 1 ngày | 1-2 giờ (`/cook`) |
| Debug lỗi phức tạp | 2-4 giờ | 30 phút (`/debug`) |
| Viết documentation | 2-3 giờ | 20 phút (`/docs`) |

---

## 📦 Cài Đặt

### Yêu cầu hệ thống

| Yêu cầu | Version | Kiểm tra |
|---------|---------|----------|
| Node.js | ≥ 18.0 | `node --version` |
| Git | ≥ 2.0 | `git --version` |
| npm | ≥ 8.0 | `npm --version` |

### Bước 1: Cài đặt Gemini CLI

```bash
# macOS / Linux
npm install -g @anthropics/gemini-cli

# Windows (PowerShell as Admin)
npm install -g @anthropics/gemini-cli

# Xác nhận cài đặt
gemini --version
```

Nếu là lần đầu chạy, Gemini CLI sẽ yêu cầu cấu hình API key:

```bash
# Chạy lần đầu
gemini

# Làm theo hướng dẫn để:
# 1. Đăng nhập Google account
# 2. Authorize Gemini CLI
```

### Bước 2: Cài đặt Gemini-Kit Extension

**Cách 1: Cài tự động (Khuyên dùng)**

```bash
# Clone và cài đặt
git clone https://github.com/nth5693/gemini-kit.git ~/.gemini/extensions/gemini-kit

# Vào thư mục
cd ~/.gemini/extensions/gemini-kit

# Cài dependencies và build
npm install && npm run build

# Link extension
gemini extensions link $(pwd)
```

**Cách 2: Chỉ clone (Nếu đã build sẵn)**

```bash
git clone https://github.com/nth5693/gemini-kit.git ~/.gemini/extensions/gemini-kit
```

### Bước 3: Xác nhận cài đặt thành công

```bash
# Vào project của bạn
cd /path/to/your/project

# Khởi động Gemini
gemini

# Thử một lệnh
> /help

# Nếu thấy danh sách commands → Thành công! 🎉
```

### Cập nhật lên phiên bản mới

```bash
cd ~/.gemini/extensions/gemini-kit
git pull origin main
npm install && npm run build
```

---

## 💻 Cách Sử Dụng

### Workflow cơ bản

```bash
# 1. Mở terminal trong project của bạn
cd my-project

# 2. Khởi động Gemini
gemini

# 3. Sử dụng commands
> /cook Thêm chức năng login với Google OAuth
```

### Các scenarios phổ biến

#### 🆕 Bắt đầu feature mới

```bash
# Lập kế hoạch trước
> /plan Add user authentication with JWT

# Hoặc chạy full workflow
> /cook Implement JWT authentication
```

#### 🐛 Fix bug

```bash
# Debug lỗi
> /debug Tại sao API trả về 500 khi upload file lớn?

# Hoặc quick fix
> /fix TypeError: Cannot read property 'id' of undefined at line 42
```

#### 🔍 Khám phá codebase mới

```bash
# Phân tích toàn bộ project
> /scout

# Tập trung vào thư mục cụ thể
> /scout src/services

# Scout với extension mode (chi tiết hơn)
> /scout-ext
```

#### 📝 Viết documentation

```bash
# Tạo/cập nhật README
> /docs Generate README for this project

# Tạo API docs
> /docs Create API documentation for src/api
```

#### 🧪 Viết tests

```bash
# Viết tests cho file cụ thể
> /test Write unit tests for src/services/auth.ts

# Chạy với coverage target
> /test Achieve 80% coverage for utils folder
```

#### 👀 Code review

```bash
# Review file
> /review src/controllers/user.ts

# Review Pull Request
> /review-pr 123
```

---

## 🤖 Danh Sách Agents

### Agents Core (Dùng thường xuyên)

| Agent | File | Chức năng | Khi nào dùng |
|-------|------|-----------|--------------|
| 📋 **Planner** | `agents/planner.md` | Tạo kế hoạch chi tiết với timeline, risk assessment, rollback plan | Bắt đầu feature mới, task phức tạp |
| 🔍 **Scout** | `agents/scout.md` | Phân tích cấu trúc codebase, tìm patterns, dependencies | Project mới, onboarding |
| 💻 **Coder** | `agents/coder.md` | Viết code sạch, follow conventions, error handling | Implement features |
| 🧪 **Tester** | `agents/tester.md` | Viết unit/integration tests, mocking, coverage | Đảm bảo quality |
| 👀 **Reviewer** | `agents/reviewer.md` | Review code, tìm bugs, suggest improvements | Trước khi merge PR |

### Agents Chuyên biệt

| Agent | File | Chức năng | Khi nào dùng |
|-------|------|-----------|--------------|
| 🐛 **Debugger** | `agents/debugger.md` | Phân tích root cause, fix bugs phức tạp | Runtime errors, logic bugs |
| 🔀 **Git Manager** | `agents/git-manager.md` | Commit, branch strategy, merge conflicts | Version control |
| 🗄️ **Database Admin** | `agents/database-admin.md` | Schema design, migrations, query optimization | Database work |
| 🔬 **Researcher** | `agents/researcher.md` | Research packages, compare solutions | Chọn technology stack |
| 🎨 **UI Designer** | `agents/ui-designer.md` | Dark mode, animations, responsive design | Frontend UI/UX |
| 📝 **Docs Manager** | `agents/docs-manager.md` | README, API docs, ADR | Documentation |
| 💡 **Brainstormer** | `agents/brainstormer.md` | Brainstorm ideas, explore solutions | Stuck on problem |
| 🌐 **Fullstack** | `agents/fullstack-developer.md` | End-to-end implementation | Full feature |
| 📊 **PM** | `agents/project-manager.md` | Sprint planning, tracking | Project management |
| ✍️ **Copywriter** | `agents/copywriter.md` | Marketing copy, landing pages | Content creation |

---

## ⌨️ Tất Cả Commands

### 🍳 Workflow Commands

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/cook` | **Full development cycle**: Plan → Scout → Code → Test → Review | `/cook Add payment integration` |
| `/plan` | Tạo kế hoạch chi tiết với timeline | `/plan Migrate database to PostgreSQL` |
| `/scout` | Khám phá và phân tích codebase | `/scout src/services` |
| `/code` | Implement code theo yêu cầu | `/code Create UserService class` |
| `/test` | Viết và chạy tests | `/test Write tests for auth module` |
| `/review` | Code review với suggestions | `/review src/api/users.ts` |

### 🐛 Debug & Fix Commands

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/debug` | Phân tích và fix bugs phức tạp | `/debug Memory leak in WebSocket handler` |
| `/fix` | Quick fix cho lỗi cụ thể | `/fix ESLint errors in src/utils` |

### 📚 Documentation Commands

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/docs` | Tạo/cập nhật documentation | `/docs Generate API reference` |
| `/content` | Tạo content (blog, tutorial) | `/content Write tutorial for auth flow` |

### 🔀 Git Commands

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/git` | Git operations (commit, branch) | `/git commit với message "feat: add auth"` |
| `/pr` | Tạo Pull Request | `/pr Create PR for feature branch` |
| `/review-pr` | Review Pull Request | `/review-pr 123` |

### 🗄️ Database Commands

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/db` | Database operations | `/db Create migration for users table` |

### 🎨 Design Commands

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/design` | UI/UX design | `/design Dark mode for dashboard` |

### 💡 Brainstorm & Research Commands

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/brainstorm` | Brainstorm ý tưởng | `/brainstorm Ways to improve UX` |
| `/research` | Research technology | `/research Best auth library for Node.js` |

### 🌐 Fullstack Commands

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/fullstack` | End-to-end feature | `/fullstack User profile with avatar upload` |
| `/integrate` | Integration tasks | `/integrate Stripe payment gateway` |

### 📊 Project Management Commands

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/pm` | Project management | `/pm Create sprint plan for next 2 weeks` |
| `/ticket` | Work with tickets | `/ticket JIRA-123 breakdown` |

### 🛠️ Utility Commands

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/help` | Hiển thị trợ giúp | `/help` |
| `/session` | Quản lý session | `/session start new project` |
| `/team` | Team orchestration | `/team status` |
| `/workflow` | Run specific workflow | `/workflow quickfix` |
| `/mcp` | MCP tools help | `/mcp list` |
| `/ask` | Hỏi đáp nhanh | `/ask How to implement singleton?` |
| `/chat` | Chat tự do | `/chat Explain this code` |
| `/watzup` | Xem trạng thái | `/watzup` |

### 🎥 Media Commands

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/screenshot` | Phân tích screenshot | `/screenshot Analyze this UI design` |
| `/video` | Xử lý video content | `/video Create demo script` |

### 📋 Special Commands

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `/skill` | Skill-based routing | `/skill typescript fix type errors` |
| `/use` | Use specific tool/pattern | `/use TDD for this feature` |
| `/do` | Execute task directly | `/do Refactor this function` |
| `/journal` | Development journal | `/journal Log today's progress` |
| `/copywrite` | Marketing copywriting | `/copywrite Landing page hero` |

---

## 🔧 MCP Tools

Gemini-Kit cung cấp các MCP tools cho các tác vụ nâng cao:

### Core Tools

| Tool | Chức năng | Ví dụ sử dụng |
|------|-----------|---------------|
| `kit_create_checkpoint` | Tạo Git checkpoint trước khi thay đổi | Auto-backup trước `/cook` |
| `kit_restore_checkpoint` | Rollback về checkpoint | Khi tests fail |
| `kit_list_checkpoints` | Liệt kê checkpoints | Xem history |
| `kit_auto_rollback` | Tự động rollback | Khi có lỗi critical |

### Context Tools

| Tool | Chức năng |
|------|-----------|
| `kit_get_project_context` | Lấy thông tin project (structure, deps) |
| `kit_handoff_agent` | Chuyển context giữa agents |
| `kit_save_artifact` | Lưu artifacts (plans, reports) |

### Knowledge Tools

| Tool | Chức năng |
|------|-----------|
| `kit_save_learning` | Lưu feedback để AI học |
| `kit_get_learnings` | Lấy learnings đã lưu |
| `kit_index_codebase` | Index codebase cho search |
| `kit_keyword_search` | Tìm kiếm trong codebase |

### Integration Tools

| Tool | Chức năng |
|------|-----------|
| `kit_github_create_pr` | Tạo GitHub PR |
| `kit_github_get_pr` | Lấy thông tin PR |
| `kit_github_get_issue` | Lấy thông tin Issue |
| `kit_jira_get_ticket` | Lấy thông tin Jira ticket |

### Orchestration Tools

| Tool | Chức năng |
|------|-----------|
| `kit_team_start` | Bắt đầu team session |
| `kit_team_status` | Xem trạng thái session |
| `kit_team_end` | Kết thúc session |
| `kit_run_workflow` | Chạy workflow cụ thể |
| `kit_smart_route` | Auto-select workflow |

---

## 🔒 Security Features

Gemini-Kit có các tính năng bảo mật tích hợp:

### Secret Detection (30+ patterns)

```
✅ AWS Access Keys (AKIA...)
✅ GitHub Tokens (ghp_, gho_, ghu_)
✅ OpenAI API Keys (sk-...)
✅ Google API Keys (AIza...)
✅ Slack Tokens (xox...)
✅ Private Keys (-----BEGIN PRIVATE KEY-----)
✅ Database Connection Strings
✅ Bearer Tokens
```

### Dangerous Command Blocking

```
🚫 rm -rf /
🚫 dd if=/dev/zero
🚫 Fork bombs
🚫 curl | sh
```

### Path Traversal Prevention

```
🚫 ../../etc/passwd
🚫 Path injection attempts
```

---

## ❓ FAQ

### Gemini-Kit có miễn phí không?
✅ **Có**, hoàn toàn miễn phí và open source (MIT License).

### Cần API key không?
Bạn cần cấu hình **Gemini CLI** với Google account. Không cần API key riêng.

### Hỗ trợ ngôn ngữ nào?
✅ TypeScript, JavaScript, Python, Go, Rust, Java, và nhiều ngôn ngữ khác.

### Hoạt động trên OS nào?
✅ macOS, Linux, Windows (WSL recommended)

### Dữ liệu có được gửi đi đâu không?
Chỉ gửi đến Google Gemini API (giống Gemini CLI gốc). Không gửi đến server thứ ba.

---

## 🤝 Đóng Góp

Contributions welcome! 

1. Fork repo
2. Tạo branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

---

## 📄 License

MIT © 2024

---

<p align="center">
  Made with ❤️ by the Gemini-Kit Team<br>
  <a href="https://github.com/nth5693/gemini-kit">GitHub</a> •
  <a href="https://github.com/nth5693/gemini-kit/releases">Releases</a> •
  <a href="https://github.com/nth5693/gemini-kit/issues">Issues</a>
</p>
