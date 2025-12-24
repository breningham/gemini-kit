# 🚀 Quick Start Guide

Bắt đầu với Gemini-Kit trong 5 phút!

## Prerequisites

- [Gemini CLI](https://github.com/google-gemini/gemini-cli) đã cài đặt
- Node.js 18+ (cho MCP tools)

## Bước 1: Cài đặt Gemini-Kit (30s)

```bash
# Clone repository
git clone https://github.com/nth5693/gemini-kit.git

# Di chuyển vào thư mục
cd gemini-kit

# Cài dependencies
npm install
```

## Bước 2: Cấu hình Extension (30s)

Thêm vào `~/.gemini/settings.json`:

```json
{
  "extensions": [
    {
      "name": "gemini-kit",
      "path": "/path/to/gemini-kit"
    }
  ]
}
```

## Bước 3: Lệnh đầu tiên! (1 phút)

```bash
# Mở project của bạn
cd /your/project

# Khởi động Gemini CLI
gemini

# Chạy lệnh đầu tiên
/status
```

**Output mẫu:**
```
📊 PROJECT STATUS
================
📋 Active Specs: 0
📝 Active Plans: 0
✅ Active Todos: 0
🏥 Compound Health: D (New)
```

---

## Essential Commands

### 🔥 Top 5 Commands cho người mới

| Command | Mô tả | Khi nào dùng |
|---------|-------|--------------|
| `/status` | Xem tiến độ project | Bắt đầu mỗi session |
| `/explore` | Nghiên cứu trước khi làm | Trước feature mới |
| `/plan` | Tạo kế hoạch | Trước khi code |
| `/work` | Execute plan | Khi đã có plan |
| `/housekeeping` | Cleanup | Trước khi push |

### 🤖 Agents chính

| Agent | Khi cần |
|-------|---------|
| Planner | "Tạo plan cho feature X" |
| Coder | "Viết code cho Y" |
| Reviewer | "Review code này" |
| Debugger | "Tìm lỗi trong Z" |

---

## Workflow cơ bản

```
📝 /explore → Nghiên cứu
     ↓
📋 /plan → Lên kế hoạch  
     ↓
💻 /work → Execute
     ↓
🔍 /review → Review
     ↓
🧹 /housekeeping → Cleanup
     ↓
📤 git push → Ship!
```

---

## Next Steps

1. **Đọc [FEATURES.md](docs/FEATURES.md)** - Hiểu tất cả features
2. **Thử `/kit:setup`** - Setup project context
3. **Thử `/explore`** - Nghiên cứu một topic

---

## Cần help?

- Gõ `/help` trong Gemini CLI
- Xem [API Reference](docs/API.md)
- Xem [Critical Patterns](docs/solutions/patterns/critical-patterns.md)
