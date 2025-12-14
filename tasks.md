# GEMINI-KIT ADVANCED FEATURES ROADMAP TASKS

## Phase 1: LEARNINGS.md - Context Learning 🟢
> Thời gian: 2h | Độ khó: Dễ

- [ ] **1.1** Thêm MCP tool `kit_save_learning`
- [ ] **1.2** Thêm MCP tool `kit_get_learnings`
- [ ] **1.3** Tạo file `~/.gemini-kit/learnings/LEARNINGS.md`
- [ ] **1.4** Cập nhật `before-agent.js` hook để inject learnings
- [ ] **1.5** Cập nhật GEMINI.md hướng dẫn AI dùng learnings
- [ ] **1.6** Test: AI tự lưu học và apply

---

## Phase 2: Dry Run Mode 🟢
> Thời gian: 1h | Độ khó: Dễ

- [ ] **2.1** Tạo `/code-preview` command (TOML)
- [ ] **2.2** Thêm MCP tool `kit_apply_diff`
- [ ] **2.3** Test: Preview changes trước khi apply

---

## Phase 3: Auto-Rollback 🟡
> Thời gian: 3h | Độ khó: Trung bình

- [ ] **3.1** Sửa `/cook` để tự động tạo checkpoint đầu tiên
- [ ] **3.2** Thêm logic rollback nếu test fail
- [ ] **3.3** Thêm MCP tool `kit_auto_rollback`
- [ ] **3.4** Cập nhật `after-tool.js` hook
- [ ] **3.5** Test: Workflow tự rollback khi fail

---

## Phase 4: RAG/Vector Search 🔴
> Thời gian: 1-2 ngày | Độ khó: Khó

- [ ] **4.1** Research vector DB (LanceDB vs ChromaDB)
- [ ] **4.2** Tạo `src/vector-db.ts` - Vector database wrapper
- [ ] **4.3** Tạo `src/indexer.ts` - Script index codebase
- [ ] **4.4** Thêm MCP tool `kit_semantic_search`
- [ ] **4.5** Tích hợp vào `/scout` command
- [ ] **4.6** Test: Tìm kiếm ngữ nghĩa trong codebase lớn
