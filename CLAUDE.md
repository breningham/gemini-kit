# GEMINI-KIT PROJECT INSTRUCTIONS

> **QUAN TRỌNG**: File này PHẢI được đọc ở đầu MỖI phiên làm việc.
> AI assistant phải tuân theo quy trình trong file này.

---

## 📋 Project Overview

**Dự án:** Gemini-Kit - ClaudeKit-style AI Development Assistant
**Mục tiêu:** Clone 100% kiến trúc và behavior của ClaudeKit
**Tech Stack:** TypeScript, Node.js, Commander.js
**AI Models:** Gemini (primary), Claude, OpenAI

---

## 🏗️ Architecture (KHÔNG ĐƯỢC THAY ĐỔI)

```
Core Architecture:
├── 14 Specialized Agents (CORE) ← Trung tâm hệ thống
├── Agent Orchestration
├── Slash Commands (gọi Agents)
└── CLI (gk command)
```

### Nguyên tắc bắt buộc:
1. **Agents là CORE** - Mọi logic nằm trong agents
2. **Commands chỉ là wrapper** - Commands gọi agents, không tự implement
3. **Context sharing** - Agents chia sẻ context qua orchestrator
4. **ClaudeKit Parity** - Giữ đúng 100% behavior

---

## 📁 Key Files (Đọc trước khi làm việc)

| File | Mục đích |
|------|----------|
| `CLAUDE.md` | File này - Project instructions |
| `CLAUDEKIT_REFERENCE.md` | ⭐ Tài liệu ClaudeKit chính thức |
| `TASKS.md` | Task tracking với checklist |
| `IMPLEMENTATION_PLAN.md` | Detailed implementation plan |
| `SESSION_LOG.md` | Log các phiên làm việc |
| `.gemini-kit/context.json` | Current project state |

---

## 🔄 Workflow Process (BẮT BUỘC THEO)

### Khi bắt đầu phiên làm việc mới:

```
1. ĐỌC file CLAUDE.md (file này)
2. ĐỌC file TASKS.md để biết progress hiện tại
3. ĐỌC file SESSION_LOG.md để biết phiên trước làm gì
4. XÁC NHẬN với user về task tiếp theo
5. CẬP NHẬT TASKS.md khi hoàn thành task
6. GHI LOG vào SESSION_LOG.md khi kết thúc
```

### Khi implement feature:

```
1. NGHIÊN CỨU ClaudeKit docs trước
2. TẠO plan trong TASKS.md
3. XIN APPROVAL từ user
4. IMPLEMENT theo đúng plan
5. CẬP NHẬT progress trong TASKS.md
6. GHI LOG session
```

### Khi gặp quyết định thiết kế:

```
1. KHÔNG tự ý quyết định
2. HỎI user trước
3. SO SÁNH với ClaudeKit behavior
4. THEO ClaudeKit nếu có thể
```

---

## ⚠️ Những điều KHÔNG ĐƯỢC LÀM

1. ❌ Tự ý thay đổi kiến trúc
2. ❌ Thêm feature không có trong ClaudeKit
3. ❌ Skip bước trong workflow
4. ❌ Implement logic trong commands (phải ở agents)
5. ❌ Quên cập nhật TASKS.md
6. ❌ Quên ghi SESSION_LOG.md

---

## ✅ Những điều PHẢI LÀM

1. ✅ Đọc CLAUDE.md mỗi phiên
2. ✅ Theo đúng workflow process
3. ✅ Hỏi user khi không chắc
4. ✅ Cập nhật TASKS.md real-time
5. ✅ Ghi SESSION_LOG.md khi kết thúc
6. ✅ Giữ ClaudeKit parity

---

## 📊 Current Status

**Phase hiện tại:** Phase 1 - Foundation
**Task hiện tại:** Chưa bắt đầu
**Blocker:** Không có

---

## 🔗 ClaudeKit Reference

- Docs: https://docs.claudekit.cc/
- Architecture: 14 Specialized Agents + Orchestration
- Commands: 38+ slash commands

---

## 📝 Quick Reference

### 14 Agents:
1. planner, 2. scout, 3. coder, 4. debugger
5. tester, 6. code-reviewer, 7. git-manager, 8. database-admin
9. ui-ux-designer, 10. copywriter, 11. brainstormer
12. researcher, 13. journal-writer, 14. docs-manager/project-manager

### Core Commands:
`/cook`, `/bootstrap`, `/plan`, `/scout`, `/test`, `/debug`
`/fix`, `/fix:fast`, `/fix:hard`, `/fix:types`, `/fix:ui`, `/fix:ci`
`/git:commit`, `/git:cp`, `/git:pr`
`/design:fast`, `/design:good`
`/docs:init`, `/docs:update`
