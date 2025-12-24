# Exploration: Conductor Extension vs Gemini-Kit

**Date:** 2024-12-24
**Question:** Conductor extension có những tính năng gì có thể thêm vào Gemini-Kit?

## Overview

[Conductor](https://github.com/gemini-cli-extensions/conductor) là Gemini CLI extension cho phép specify, plan, và implement software features với structured workflow.

## Feature Comparison

### Conductor Features

| Feature | Command | Description |
|---------|---------|-------------|
| **Project Setup** | `/conductor:setup` | Tạo context files (product, tech-stack, guidelines) |
| **Track System** | `/conductor:newTrack` | Tạo feature/bug track với spec + plan |
| **Implementation** | `/conductor:implement` | Auto-implement theo plan với TDD |
| **Status** | `/conductor:status` | Xem progress của tracks |
| **Smart Revert** | `/conductor:revert` | Git-aware revert theo logical units |

### Gemini-Kit Features (hiện tại)

| Feature | Có? | Tương đương |
|---------|-----|-------------|
| Project Setup | ⚠️ Partial | Có `GEMINI.md` nhưng không có wizard |
| Track System | ⚠️ Partial | Có `/specs` và `/plan` nhưng riêng biệt |
| Implementation | ✅ Có | `/work` workflow |
| Status | ⚠️ Partial | `/compound-dashboard.sh` cho compound, không có track status |
| Smart Revert | ❌ Không | Có checkpoint nhưng không git-aware |

## Key Features có thể thêm vào Gemini-Kit

### 1️⃣ **Project Setup Wizard** (HIGH VALUE)

**Conductor có:**
```
/conductor:setup
├── conductor/product.md           # Product context
├── conductor/product-guidelines.md # Style guides
├── conductor/tech-stack.md        # Tech choices
├── conductor/workflow.md          # Team workflow
└── conductor/code_styleguides/    # Code style
```

**Gemini-Kit hiện có:**
- `GEMINI.md` - All-in-one config

**Benefit:** Chia nhỏ config → dễ maintain, team-friendly

---

### 2️⃣ **Track-Based Feature Management** (HIGH VALUE)

**Conductor có:**
```
conductor/tracks/
├── tracks.md                      # Master list
└── <track_id>/
    ├── spec.md                    # Requirements
    ├── plan.md                    # Tasks
    └── metadata.json              # Status tracking
```

**Gemini-Kit hiện có:**
- `docs/specs/` - Cho multi-session specs
- `plans/` - Standalone plans
- `todos/` - Task tracking

**Gap:** Không có unified "track" linking spec → plan → implementation

---

### 3️⃣ **TDD-First Workflow** (MEDIUM VALUE)

**Conductor enforces:**
1. Write failing tests (Red)
2. Implement to pass (Green)
3. Refactor
4. Verify coverage

**Gemini-Kit có:**
- `skills/testing/` skill
- Nhưng không enforce TDD flow

---

### 4️⃣ **Git Notes for Task Commits** (MEDIUM VALUE)

**Conductor có:**
```bash
git notes add -m "<task summary>" <commit_hash>
```
- Attach task context to commits
- Queryable history

**Gemini-Kit không có** git notes integration.

---

### 5️⃣ **Smart Revert by Track/Phase/Task** (HIGH VALUE)

**Conductor có:**
```
/conductor:revert
```
- Understands logical units (tracks, phases, tasks)
- Not just commit hashes

**Gemini-Kit có:**
- `kit_create_checkpoint` - Git-based snapshots
- Nhưng không track-aware

---

### 6️⃣ **Status Dashboard** (MEDIUM VALUE)

**Conductor có:**
```
/conductor:status
```
- Track progress
- Phase completion
- Task status

**Gemini-Kit có:**
- `compound-dashboard.sh` - Compound health
- Không có feature/track status

---

## Recommendations

### MUST HAVE (High Value, Easy to Add)

1. **Project Setup Wizard** (`/kit:setup`)
   - Interactive setup cho new projects
   - Generate structured context files
   - Effort: ~2-3 hours

2. **Track Status Command** (`/status`)
   - Show active specs, plans, todos
   - Effort: ~1 hour

### SHOULD HAVE (High Value, More Complex)

3. **Unified Track System**
   - Link spec → plan → todos → commits
   - May require schema changes
   - Effort: ~4-6 hours

4. **Smart Revert** (`/revert`)
   - Revert by plan/task, not just checkpoint
   - Effort: ~2-3 hours

### NICE TO HAVE (Medium Value)

5. **TDD Enforcement** in `/work` workflow
   - Add TDD steps to work.md
   - Effort: ~1 hour

6. **Git Notes Integration**
   - Attach task context to commits
   - Effort: ~1-2 hours

---

## Decision

**Proceed to /plan** để implement:
1. `/kit:setup` - Project Setup Wizard
2. `/status` - Unified Status Dashboard

Defer các items khác cho future iterations.

---

## References

- [Conductor GitHub](https://github.com/gemini-cli-extensions/conductor)
- [Conductor Workflow Template](https://github.com/gemini-cli-extensions/conductor/blob/main/templates/workflow.md)
