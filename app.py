from flask import Flask, render_template, request, jsonify
import os
import requests

app = Flask(__name__)

API_KEY = os.getenv("API_KEY", "")
BASE_URL = os.getenv("BASE_URL", "https://api.openai.com/v1/chat/completions")

def call_ai(prompt, user_text):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }

    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": prompt},
            {"role": "user", "content": user_text}
        ]
    }

    try:
        response = requests.post(BASE_URL, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        result = response.json()
        return result["choices"][0]["message"]["content"]
    except Exception as e:
        return f"AI 调用失败: {str(e)}"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    text = data.get("text", "")
    prompt = "你是一个专业的文本总结助手。请用简洁的语言总结用户提供的文本内容，提取核心要点。"
    result = call_ai(prompt, text)
    return jsonify({"result": result})

@app.route("/api/translate", methods=["POST"])
def translate():
    data = request.get_json()
    text = data.get("text", "")
    prompt = "你是一个专业的翻译助手。如果用户输入的是中文，请翻译成英文；如果是英文，请翻译成中文。只返回翻译结果，不要添加额外说明。"
    result = call_ai(prompt, text)
    return jsonify({"result": result})

@app.route("/api/polish", methods=["POST"])
def polish():
    data = request.get_json()
    text = data.get("text", "")
    prompt = "你是一个专业的文案润色助手。请优化用户提供的文本，使其更加流畅、专业、有吸引力，同时保持原意不变。"
    result = call_ai(prompt, text)
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True)
