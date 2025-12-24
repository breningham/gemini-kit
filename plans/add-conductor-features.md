# Add Conductor Features to Gemini-Kit

> Created: 2024-12-24
> Status: Implemented ✓
> Prior Exploration: [conductor-comparison-20241224.md](../docs/explorations/conductor-comparison-20241224.md)

## Summary

Thêm các tính năng hay nhất từ Conductor extension vào Gemini-Kit: Project Setup Wizard (`/kit:setup`), Status Dashboard (`/status`), và Smart Revert (`/revert`).


## Problem Statement

Gemini-Kit đã có compound system mạnh mẽ nhưng thiếu:
1. **Setup Wizard** - Phải manual config GEMINI.md
2. **Unified Status** - Không có dashboard cho specs/plans/todos
3. **Smart Revert** - Chỉ có checkpoint, không revert theo logic

## Prior Solutions

| Solution | Relevance |
|----------|-----------|
| [conductor-comparison-20241224.md](../docs/explorations/conductor-comparison-20241224.md) | Feature comparison |

---

## Proposed Solution

### Phase 1: `/kit:setup` - Project Setup Wizard (2-3h)

**Mục tiêu:** Interactive wizard để setup project context

**Files tạo:**
```
.gemini-kit/
├── product.md           # Product context
├── tech-stack.md        # Tech choices
└── guidelines.md        # Team guidelines
```

**Implementation:**
1. Tạo command `commands/kit-setup.toml`
2. Tạo workflow `.agent/workflows/kit-setup.md`
3. Tạo templates `.gemini-kit/templates/`

**Code Example:**
```toml
# commands/kit-setup.toml
description = "Interactive project setup wizard"

prompt = """
# 🚀 Kit Setup Wizard

Đây là wizard để setup project context.

## Steps:
1. Product Context - Mô tả sản phẩm, users, goals
2. Tech Stack - Language, framework, database
3. Guidelines - Code style, commit conventions

Bắt đầu với: Bạn đang build gì? Cho ai?
"""
```

---

### Phase 2: `/status` - Unified Status Dashboard (1h)

**Mục tiêu:** Xem tiến độ specs/plans/todos ở một nơi

**Implementation:**
1. Tạo script `scripts/status-dashboard.sh`
2. Tạo command `commands/status.toml`

**Output mẫu:**
```
📊 PROJECT STATUS
================

📋 Active Specs: 0
📝 Active Plans: 0
✅ Active Todos: 0

🏥 Compound Health: D (New)
   Solutions: 3
   Patterns: 23 ✅

🔧 Recent Workflows:
   /explore (2x)
   /plan-compound (1x)
   /housekeeping (2x)
```

---

### Phase 3: `/revert` - Smart Revert (2-3h) [DEFERRED]

> ⚠️ Phức tạp hơn, defer cho future iteration

**Mục tiêu:** Revert theo plan/task thay vì commit

**Dependencies:**
- Cần track plan → commit mapping
- Cần git notes integration

---

## Acceptance Criteria

### Phase 1: `/kit:setup` ✅
- [x] Command `/kit:setup` hoạt động
- [x] Tạo được 3 files context
- [x] Interactive prompts cho từng section

### Phase 2: `/status` ✅
- [x] Command `/status` hoạt động
- [x] Hiển thị specs/plans/todos count
- [x] Hiển thị compound health
- [x] Hiển thị recent workflows

---

## Technical Considerations

### Dependencies
- Không cần thêm dependencies
- Sử dụng existing scripts infrastructure

### Risks
- Low risk - Additive changes only
- Không modify existing functionality

### Alternatives Considered
| Alternative | Decision |
|-------------|----------|
| Clone entire Conductor | ❌ Rejected - Too different architecture |
| Only copy templates | ❌ Rejected - Not enough value |
| Cherry-pick best features | ✅ Selected |

---

## Implementation Steps

### Phase 1: `/kit:setup` (Est: 2-3h) ✅ DONE
- [x] Task 1.1: Create `commands/kit-setup.toml`
- [x] Task 1.2: Create `.agent/workflows/kit-setup.md`
- [x] Task 1.3: Create templates in `.gemini-kit/templates/`
- [x] Task 1.4: Test wizard flow
- [x] Task 1.5: Document in README

### Phase 2: `/status` (Est: 1h) ✅ DONE
- [x] Task 2.1: Create `scripts/status-dashboard.sh`
- [x] Task 2.2: Create `commands/status.toml`
- [x] Task 2.3: Test output
- [x] Task 2.4: Document

### Phase 3: `/revert` - DEFERRED
> See "Out of Scope" section. Tracked in future backlog.


---

## Out of Scope (Future)

1. **Smart Revert** - Defer to future iteration
2. **Git Notes Integration** - Not critical
3. **TDD Enforcement** - Optional enhancement
4. **Track System** - Requires schema changes

---

## References

- [Conductor GitHub](https://github.com/gemini-cli-extensions/conductor)
- [Exploration Document](../docs/explorations/conductor-comparison-20241224.md)
- Pattern #8: Rigorous Planning
- Pattern #10: Explore Before Plan
