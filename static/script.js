const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const loadingIndicator = document.getElementById('loadingIndicator');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const cancelBtn = document.getElementById('cancelBtn');
const clearBtn = document.getElementById('clearBtn');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const charCount = document.getElementById('charCount');
const themeToggle = document.getElementById('themeToggle');
const dragOverlay = document.getElementById('dragOverlay');
const historyCard = document.getElementById('historyCard');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const toast = document.getElementById('toast');
const toolButtons = document.querySelectorAll('.tool-btn');

let currentController = null;
let history = JSON.parse(localStorage.getItem('aiToolboxHistory') || '[]');
let stats = JSON.parse(localStorage.getItem('aiToolboxStats') || '{"totalProcessed": 0, "totalChars": 0, "totalTime": 0}');

const apiEndpoints = {
    summarize: '/api/summarize',
    translate: '/api/translate',
    polish: '/api/polish'
};

const actionNames = {
    summarize: '文本总结',
    translate: '中英翻译',
    polish: '文案润色'
};

function updateStats() {
    document.getElementById('totalProcessed').textContent = stats.totalProcessed;
    document.getElementById('totalChars').textContent = formatNumber(stats.totalChars);

    const avgTime = stats.totalProcessed > 0 ? (stats.totalTime / stats.totalProcessed / 1000).toFixed(1) : 0;
    document.getElementById('avgTime').textContent = avgTime + 's';
}

function formatNumber(num) {
    if (num >= 10000) {
        return (num / 10000).toFixed(1) + 'w';
    }
    return num;
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function updateCharCount() {
    const count = inputText.value.length;
    charCount.textContent = count.toLocaleString();
}

function saveToHistory(action, input, output) {
    const item = {
        id: Date.now(),
        action,
        input: input,
        output: output,
        inputPreview: input.substring(0, 100) + (input.length > 100 ? '...' : ''),
        outputPreview: output.substring(0, 100) + (output.length > 100 ? '...' : ''),
        timestamp: new Date().toLocaleString('zh-CN')
    };

    history.unshift(item);
    if (history.length > 20) history.pop();

    localStorage.setItem('aiToolboxHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    if (history.length === 0) {
        historyCard.style.display = 'none';
        return;
    }

    historyCard.style.display = 'block';
    historyList.innerHTML = history.map(item => `
        <div class="history-item" data-id="${item.id}">
            <div class="history-item-header">
                <span class="history-item-type">${actionNames[item.action]}</span>
                <span class="history-item-time">${item.timestamp}</span>
                <button class="history-item-delete" data-id="${item.id}" title="删除">×</button>
            </div>
            <div class="history-item-content">
                <div class="history-item-section">
                    <strong>输入：</strong>${item.inputPreview || item.input}
                </div>
                <div class="history-item-section">
                    <strong>输出：</strong>${item.outputPreview || item.output}
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('history-item-delete')) {
                e.stopPropagation();
                const id = parseInt(e.target.dataset.id);
                history = history.filter(h => h.id !== id);
                localStorage.setItem('aiToolboxHistory', JSON.stringify(history));
                renderHistory();
                showToast('🗑️ 已删除历史记录');
                return;
            }

            const id = parseInt(item.dataset.id);
            const historyItem = history.find(h => h.id === id);
            if (historyItem) {
                inputText.value = historyItem.input;
                outputText.value = historyItem.output;
                outputText.style.display = 'block';
                copyBtn.style.display = 'block';
                downloadBtn.style.display = 'block';
                updateCharCount();
                showToast('✅ 已加载历史记录');
            }
        });
    });
}

function typewriterEffect(text, element) {
    element.value = '';
    element.style.display = 'block';
    let index = 0;

    const interval = setInterval(() => {
        if (index < text.length) {
            element.value += text[index];
            index++;
        } else {
            clearInterval(interval);
        }
    }, 10);
}

async function callAPI(action) {
    const text = inputText.value.trim();

    if (!text) {
        showToast('⚠️ 请先输入文本内容');
        inputText.focus();
        return;
    }

    toolButtons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.tool-btn').classList.add('active');

    outputText.style.display = 'none';
    loadingIndicator.style.display = 'flex';
    copyBtn.style.display = 'none';
    downloadBtn.style.display = 'none';
    cancelBtn.style.display = 'block';

    currentController = new AbortController();
    const startTime = Date.now();

    try {
        const response = await fetch(apiEndpoints[action], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text }),
            signal: currentController.signal
        });

        const data = await response.json();
        const endTime = Date.now();
        const duration = endTime - startTime;

        loadingIndicator.style.display = 'none';
        cancelBtn.style.display = 'none';

        typewriterEffect(data.result, outputText);

        copyBtn.style.display = 'block';
        downloadBtn.style.display = 'block';

        saveToHistory(action, text, data.result);

        // 更新统计
        stats.totalProcessed++;
        stats.totalChars += text.length;
        stats.totalTime += duration;
        localStorage.setItem('aiToolboxStats', JSON.stringify(stats));
        updateStats();

        setTimeout(() => {
            toolButtons.forEach(btn => btn.classList.remove('active'));
        }, 300);

    } catch (error) {
        if (error.name === 'AbortError') {
            showToast('⏹️ 已取消请求');
        } else {
            showToast('❌ 请求失败，请检查网络或稍后重试');
            console.error(error);
        }

        loadingIndicator.style.display = 'none';
        cancelBtn.style.display = 'none';
        outputText.style.display = 'block';
    }
}

toolButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const action = btn.getAttribute('data-action');
        callAPI(action);
    });
});

copyBtn.addEventListener('click', () => {
    const text = outputText.value;

    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ 已复制到剪贴板');
    }).catch(() => {
        showToast('❌ 复制失败');
    });
});

downloadBtn.addEventListener('click', () => {
    const text = outputText.value;
    if (!text) return;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-toolbox-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    showToast('💾 文件已下载');
});

cancelBtn.addEventListener('click', () => {
    if (currentController) {
        currentController.abort();
        currentController = null;
    }
});

clearBtn.addEventListener('click', () => {
    inputText.value = '';
    updateCharCount();
    showToast('🗑️ 已清空输入');
});

uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        inputText.value = event.target.result;
        updateCharCount();
        showToast('📂 文件已加载');
    };
    reader.readAsText(file);
});

inputText.addEventListener('input', updateCharCount);

inputText.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragOverlay.classList.add('active');
});

inputText.addEventListener('dragleave', () => {
    dragOverlay.classList.remove('active');
});

inputText.addEventListener('drop', (e) => {
    e.preventDefault();
    dragOverlay.classList.remove('active');

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        inputText.value = event.target.result;
        updateCharCount();
        showToast('📂 文件已加载');
    };
    reader.readAsText(file);
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    showToast(isDark ? '🌙 深色模式' : '☀️ 浅色模式');
});

clearHistoryBtn.addEventListener('click', () => {
    if (confirm('确定要清空所有历史记录吗？')) {
        history = [];
        localStorage.removeItem('aiToolboxHistory');
        renderHistory();
        showToast('🗑️ 历史记录已清空');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        const key = e.key;
        if (key === '1') {
            e.preventDefault();
            toolButtons[0].click();
        } else if (key === '2') {
            e.preventDefault();
            toolButtons[1].click();
        } else if (key === '3') {
            e.preventDefault();
            toolButtons[2].click();
        }
    }
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.querySelector('.theme-icon').textContent = '☀️';
}

renderHistory();
updateCharCount();
updateStats();
