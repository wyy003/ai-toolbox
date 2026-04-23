# 🤖 AI 工具箱

> 轻量级 AI 文本处理工具集，让文本处理更智能、更高效

基于 Flask 构建的 Web 应用，集成 AI 能力，提供文本总结、智能翻译和文案润色三大核心功能。简洁的界面设计，开箱即用。

## ✨ 核心功能

| 功能 | 说明 |
|------|------|
| 📝 **文本总结** | 智能提取长文本核心要点，快速把握关键信息 |
| 🌐 **智能翻译** | 中英文双向互译，自动识别语言并输出流畅译文 |
| ✍️ **文案润色** | 优化文本表达，提升专业度和可读性，保持原意不变 |

## 🛠 技术栈

- **后端框架**：Flask (Python)
- **前端技术**：原生 HTML + CSS + JavaScript
- **AI 接口**：OpenAI API 兼容格式（支持自定义端点）

## 🚀 快速开始

### 环境要求

- Python 3.7+
- 有效的 OpenAI API 密钥（或兼容接口）

### 安装步骤

**1. 克隆项目**

```bash
git clone https://github.com/wyy003/ai-toolbox.git
cd ai-toolbox
```

**2. 安装依赖**

```bash
pip install flask requests
```

**3. 配置环境变量**

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
python app.py
```

访问 `http://127.0.0.1:5000` 开始使用 🎉

## 📁 项目结构

```
ai-toolbox/
├── app.py              # Flask 后端主程序，处理 API 调用
├── templates/
│   └── index.html      # 前端页面，用户交互界面
├── static/
│   ├── style.css       # 样式文件，界面美化
│   └── script.js       # 前端逻辑，异步请求处理
└── README.md           # 项目文档
```

## 💡 使用指南

1. 在文本框中输入需要处理的内容
2. 选择对应功能：
   - **总结**：适合长文章、会议记录、新闻报道
   - **翻译**：自动识别中英文并互译
   - **润色**：优化邮件、文案、报告等文本
3. 点击按钮，等待 AI 处理
4. 查看结果并复制使用

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

## 🔒 注意事项

- 请妥善保管 API 密钥，避免泄露
- 支持任何兼容 OpenAI 格式的 API 接口（如 Azure OpenAI、本地部署模型等）
- 默认使用 `gpt-3.5-turbo` 模型，可根据需求调整
- API 调用可能产生费用，请注意用量控制

## 📄 开源协议

MIT License - 自由使用、修改和分发

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Made with ❤️ by wyy003**
