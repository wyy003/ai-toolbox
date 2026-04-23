# 🤖 AI 工具箱

> 轻量级 AI 文本处理工具集 + 实时聊天室，让文本处理更智能、更高效

基于 Flask 构建的 Web 应用，集成 AI 能力和实时通信功能。提供文本总结、智能翻译、文案润色和实时聊天室四大核心功能。

## ✨ 核心功能

| 功能 | 说明 |
|------|------|
| 📝 **文本总结** | 智能提取长文本核心要点，快速把握关键信息 |
| 🌐 **智能翻译** | 中英文双向互译，自动识别语言并输出流畅译文 |
| ✍️ **文案润色** | 优化文本表达，提升专业度和可读性，保持原意不变 |
| 💬 **实时聊天室** | WebSocket 实时通信，支持多人在线聊天，显示在线人数 |

## 🛠 技术栈

- **后端框架**：Flask + Flask-SocketIO
- **前端技术**：原生 HTML + CSS + JavaScript
- **实时通信**：WebSocket (Socket.IO)
- **AI 接口**：OpenAI API 兼容格式（支持自定义端点）

## 🚀 快速开始

### 环境要求

- Python 3.7+
- 有效的 OpenAI API 密钥（或兼容接口，仅 AI 工具需要）

### 安装步骤

**1. 克隆项目**

```bash
git clone https://github.com/wyy003/ai-toolbox.git
cd ai-toolbox
```

**2. 安装依赖**

```bash
pip install -r requirements.txt
```

**3. 配置环境变量（仅 AI 工具需要）**

```bash
# Linux/Mac
export API_KEY="your-api-key-here"
export BASE_URL="https://api.openai.com/v1/chat/completions"  # 可选

# Windows (PowerShell)
$env:API_KEY="your-api-key-here"
$env:BASE_URL="https://api.openai.com/v1/chat/completions"  # 可选
```

**4. 启动应用**

```bash
# AI 文本处理工具
python app.py

# 实时聊天室
python chat_app.py
```

- AI 工具访问：`http://127.0.0.1:5000` 🎉
- 聊天室访问：`http://127.0.0.1:5000` 💬

## 📁 项目结构

```
ai-toolbox/
├── app.py              # AI 文本处理主程序
├── chat_app.py         # 实时聊天室主程序
├── requirements.txt    # 项目依赖
├── templates/
│   ├── index.html      # AI 工具前端页面
│   └── chat.html       # 聊天室前端页面
├── static/
│   ├── style.css       # AI 工具样式
│   ├── script.js       # AI 工具逻辑
│   ├── chat.css        # 聊天室样式
│   └── chat.js         # 聊天室逻辑
└── README.md           # 项目文档
```

## 💡 使用指南

### AI 文本处理工具

1. 在文本框中输入需要处理的内容
2. 选择对应功能：
   - **总结**：适合长文章、会议记录、新闻报道
   - **翻译**：自动识别中英文并互译
   - **润色**：优化邮件、文案、报告等文本
3. 点击按钮，等待 AI 处理
4. 查看结果并复制使用

### 实时聊天室

1. 输入你的昵称进入聊天室
2. 页面顶部显示当前在线人数
3. 输入消息并发送，所有在线用户实时接收
4. 系统自动提示用户加入/离开

## ⚙️ 配置说明

### 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `API_KEY` | OpenAI API 密钥 | 无（必填） |
| `BASE_URL` | API 端点地址 | `https://api.openai.com/v1/chat/completions` |

### 自定义 AI 模型

修改 `app.py` 中的 `model` 参数：

```python
"model": "gpt-4",  # 或其他兼容模型
```

## 🎯 聊天室功能特性

- ✅ 实时消息广播（WebSocket）
- ✅ 在线人数统计
- ✅ 用户加入/离开提示
- ✅ 简洁的聊天界面
- ✅ 支持回车发送消息
- ✅ 自动滚动到最新消息

## 🔒 注意事项

- 请妥善保管 API 密钥，避免泄露
- 支持任何兼容 OpenAI 格式的 API 接口（如 Azure OpenAI、本地部署模型等）
- 默认使用 `gpt-3.5-turbo` 模型，可根据需求调整
- API 调用可能产生费用，请注意用量控制
- 聊天室无需 API 密钥即可使用

## 📄 开源协议

MIT License - 自由使用、修改和分发

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Made with ❤️ by wyy003**
