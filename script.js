document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const exportBtn = document.getElementById('exportBtn');

    convertBtn.addEventListener('click', function() {
        const text = inputText.value;
        if (text.trim() === '') {
            alert('テキストを入力してください。');
            return;
        }
        
        const lines = text.split('\n');
        const convertedLines = lines.map(line => {
            if (line.trim() === '') {
                return line;
            }
            return '０：' + line;
        });
        
        outputText.value = convertedLines.join('\n');
    });

    clearBtn.addEventListener('click', function() {
        inputText.value = '';
        outputText.value = '';
        inputText.focus();
    });

    copyBtn.addEventListener('click', function() {
        if (outputText.value.trim() === '') {
            alert('コピーするテキストがありません。');
            return;
        }
        
        outputText.select();
        outputText.setSelectionRange(0, 99999);
        
        try {
            navigator.clipboard.writeText(outputText.value).then(function() {
                alert('テキストをコピーしました！');
            }).catch(function() {
                document.execCommand('copy');
                alert('テキストをコピーしました！');
            });
        } catch (err) {
            document.execCommand('copy');
            alert('テキストをコピーしました！');
        }
    });

    exportBtn.addEventListener('click', function() {
        if (outputText.value.trim() === '') {
            alert('エクスポートするテキストがありません。');
            return;
        }
        
        const blob = new Blob([outputText.value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'seigeki_text.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    inputText.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            convertBtn.click();
        }
    });
});