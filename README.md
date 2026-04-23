# AI 工具箱

一个基于 Flask 的 AI 文本处理工具集，提供文本总结、翻译和润色功能。

## 功能特性

- **文本总结**：提取长文本的核心要点
- **智能翻译**：中英文互译
- **文案润色**：优化文本表达，使其更流畅专业

## 技术栈

- **后端**：Flask (Python)
- **前端**：HTML + CSS + JavaScript
- **AI 接口**：OpenAI API (兼容格式)

## 快速开始

### 1. 安装依赖

```bash
pip install flask requests
```

### 2. 配置环境变量

```bash
export API_KEY="你的API密钥"
export BASE_URL="https://api.openai.com/v1/chat/completions"  # 可选，默认为 OpenAI
```

### 3. 运行应用

```bash
python app.py
```

访问 `http://127.0.0.1:5000` 即可使用。

## 项目结构

```
ai-toolbox/
├── app.py              # Flask 后端主程序
├── templates/
│   └── index.html      # 前端页面
├── static/
│   ├── style.css       # 样式文件
│   └── script.js       # 前端交互逻辑
└── README.md           # 项目说明
```

## 使用说明

1. 在文本框中输入需要处理的内容
2. 点击对应功能按钮（总结/翻译/润色）
3. 等待 AI 处理完成，查看结果

## 注意事项

- 需要有效的 API 密钥才能使用
- 支持任何兼容 OpenAI 格式的 API 接口
- 默认使用 `gpt-3.5-turbo` 模型

## License

MIT
