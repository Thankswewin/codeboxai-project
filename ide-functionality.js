// IDE Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get references to IDE elements
    const codeEditor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');
    const fileList = document.getElementById('file-list');
    const themeToggle = document.getElementById('theme-toggle');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const aiPanelToggle = document.getElementById('ai-panel-toggle');
    const aiInput = document.getElementById('ai-input');
    const sendButton = document.getElementById('send-button');
    const chatArea = document.getElementById('chat-area');

    // Toggle sidebar
    sidebarToggle.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('collapsed');
    });

    // Toggle AI panel
    aiPanelToggle.addEventListener('click', () => {
        const aiPanel = document.querySelector('.ai-panel');
        aiPanel.classList.toggle('collapsed');
    });

    // Update line numbers
    function updateLineNumbers() {
        const lines = codeEditor.value.split('\n');
        lineNumbers.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
    }

    // Handle code editor input
    codeEditor.addEventListener('input', () => {
        updateLineNumbers();
        // Add syntax highlighting here if needed
    });

    // Handle file selection
    fileList.addEventListener('change', (e) => {
        const selectedFile = e.target.value;
        let defaultContent = '';
        
        switch(selectedFile) {
            case 'index.html':
                defaultContent = `<!DOCTYPE html>
<html>
<head>
    <title>My Project</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>`;
                break;
            case 'styles.css':
                defaultContent = `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
}`;
                break;
            case 'script.js':
                defaultContent = `// Your JavaScript code here
console.log('Hello World');`;
                break;
        }
        
        codeEditor.value = defaultContent;
        updateLineNumbers();
    });

    // Handle AI chat
    sendButton.addEventListener('click', () => {
        const message = aiInput.value.trim();
        if (message) {
            // Add user message to chat
            chatArea.innerHTML += `<div class="user-message">${message}</div>`;
            aiInput.value = '';
            
            // Simulate AI response
            setTimeout(() => {
                chatArea.innerHTML += `<div class="ai-message">I'm your AI coding assistant. How can I help you today?</div>`;
                chatArea.scrollTop = chatArea.scrollHeight;
            }, 1000);
        }
    });

    // Handle theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Initialize line numbers
    updateLineNumbers();
}); 