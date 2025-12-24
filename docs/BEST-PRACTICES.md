# 🎯 Best Practices

Hướng dẫn sử dụng Gemini-Kit hiệu quả.

---

## Core Principles

### 1. Search Before Solving

**LUÔN** search trước khi giải quyết vấn đề:

```bash
./scripts/compound-search.sh "your problem keywords"
```

**Tại sao?**
- Tránh reinvent the wheel
- Learn từ past solutions
- Tiết kiệm thời gian

---

### 2. Plan Before Code

**KHÔNG BAO GIỜ** code trước khi có plan:

```
❌ Sai: "Viết feature X ngay"
✅ Đúng: "/plan feature X" → approve → "/work"
```

---

### 3. Compound Every Solution

Sau khi giải quyết vấn đề hay:

```bash
/compound "How we solved X"
```

**Tại sao?**
- Future sessions có context
- Knowledge compounds over time
- Team learns từ solutions

---

### 4. Housekeeping Before Push

**MANDATORY** trước mỗi git push:

```bash
/housekeeping
```

---

## Critical Patterns (Top 5)

| # | Pattern | Summary |
|---|---------|---------|
| 1 | Search Before Solving | Luôn search trước |
| 2 | Actionable Items → Todo | Convert to todo files |
| 3 | Housekeeping Before Push | Cleanup trước push |
| 8 | Rigorous Planning | Multi-order thinking |
| 10 | Explore Before Plan | Research trước plan |

[Xem đầy đủ 23 patterns](docs/solutions/patterns/critical-patterns.md)

---

## Session Resume Protocol

**Bắt đầu mỗi session:**

```bash
# 1. Check pending work
cat skills/session-resume/SKILL.md

# 2. Check active specs
ls docs/specs/*/README.md

# 3. Check status
/status
```

---

## Team Workflow

### Setup cho Team

1. Clone gemini-kit
2. Chạy `/kit:setup` để tạo context
3. Share `.gemini-kit/` folder với team

### Daily Flow

| Time | Action |
|------|--------|
| Morning | `/status`, check pending |
| Working | `/plan` → `/work` → `/review` |
| Before push | `/housekeeping` |
| End of day | `/compound` nếu solved gì hay |

---

## Troubleshooting

### "Không biết bắt đầu từ đâu"

```bash
/status          # Check current state
/explore "topic" # Research first
```

### "Code không work"

```bash
# Dùng Debugger agent
"Giúp tôi debug lỗi X trong file Y"
```

### "Validation failed"

```bash
./scripts/validate-compound.sh  # Check what's wrong
./scripts/pre-push-housekeeping.sh --fix  # Auto-fix
```

### "Session mới, không nhớ context"

```bash
cat skills/session-resume/SKILL.md
cat docs/specs/*/00-START-HERE.md  # If has active spec
```

---

## Anti-Patterns

| ❌ Đừng | ✅ Nên |
|---------|--------|
| Code trước plan | `/plan` → `/work` |
| Skip housekeeping | `/housekeeping` trước push |
| Không search | Search trước mọi thứ |
| Để solution evaporate | `/compound` document lại |
| Ignore patterns | Đọc critical-patterns.md |

---

## Resources

- [Quick Start](../QUICKSTART.md)
- [Features Reference](FEATURES.md)
- [Workflows Guide](WORKFLOWS.md)
- [Critical Patterns](solutions/patterns/critical-patterns.md)
- [API Reference](API.md)
