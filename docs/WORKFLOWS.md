# 🔄 Workflows Guide

Hướng dẫn sử dụng các workflows trong Gemini-Kit.

---

## Compound Loop (Core Workflow)

```
┌─────────────────────────────────────────────────────────────┐
│                    🔄 COMPOUND LOOP                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   /explore  ──▶  /plan  ──▶  /work  ──▶  /review           │
│       │                                      │              │
│       │                                      ▼              │
│       │                               /compound             │
│       │                                      │              │
│       │                                      ▼              │
│       └──────────────────────────  /housekeeping            │
│                                                             │
│   Mỗi vòng lặp → Knowledge compounds → Next loop dễ hơn    │
└─────────────────────────────────────────────────────────────┘
```

---

## Workflows Chi Tiết

### 1. /explore - Research First

**Khi nào:** Trước feature phức tạp, công nghệ mới

```bash
/explore "authentication best practices"
```

**Output:**
- `docs/explorations/{topic}-{date}.md`

---

### 2. /plan - Quick Planning

**Khi nào:** Feature đơn giản, scope rõ ràng

```bash
/plan "Add user profile page"
```

**Output:**
- `plans/{feature-name}.md`

---

### 3. /plan-compound - Comprehensive Planning

**Khi nào:** Feature phức tạp, cần search existing solutions

```bash
/plan-compound "Implement OAuth2"
```

**Includes:**
- Search existing solutions
- Check critical patterns
- Multi-order thinking

---

### 4. /work - Execute Plan

**Khi nào:** Đã có plan, ready to implement

```bash
/work
```

**Flow:**
1. Read plan
2. Create todo list
3. Execute tasks
4. Test continuously
5. Commit & push

---

### 5. /review - Quick Review

**Khi nào:** Self-review, small changes

```bash
/review
```

---

### 6. /review-compound - Multi-Pass Review

**Khi nào:** Before merge, critical changes

**Passes:**
1. 🔒 Security Review
2. ⚡ Performance Review
3. 🏛️ Architecture Review
4. 💾 Data Integrity Review
5. 🎯 Simplicity Review

---

### 7. /compound - Document Solution

**Khi nào:** Solved interesting problem, found pattern

```bash
/compound "How we fixed the caching issue"
```

**Output:**
- `docs/solutions/{category}/{solution}.md`

---

### 8. /housekeeping - Pre-Push Cleanup

**Khi nào:** MANDATORY trước git push

```bash
/housekeeping
```

**Checks:**
- Archive completed items
- Validate compound system
- Check documentation freshness

---

### 9. /specs - Multi-Session Initiative

**Khi nào:** Work spans multiple weeks

```bash
/specs "Major refactor"
```

**Output:**
- `docs/specs/{name}/README.md`
- `docs/specs/{name}/00-START-HERE.md`
- `docs/specs/{name}/03-tasks.md`

---

### 10. /status - Project Status

**Khi nào:** Bắt đầu session, check progress

```bash
/status
```

---

## Workflow Cheat Sheet

| Situation | Workflow |
|-----------|----------|
| Bắt đầu feature mới | `/explore` → `/plan` |
| Feature đơn giản | `/plan` → `/work` |
| Feature phức tạp | `/explore` → `/plan-compound` → `/work` |
| Review changes | `/review` hoặc `/review-compound` |
| Trước git push | `/housekeeping` |
| Multi-week project | `/specs` |
| Check status | `/status` |

---

## Tips

1. **Luôn search trước** - `./scripts/compound-search.sh`
2. **Plan trước code** - Không improvise
3. **Test liên tục** - Không đợi cuối
4. **Document solutions** - `/compound` sau khi giải bug
5. **Housekeeping trước push** - MANDATORY
