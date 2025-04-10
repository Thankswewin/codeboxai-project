# CodeBox AI - VS Code Extension

CodeBox AI is an intelligent coding assistant that helps you write better code faster. Similar to Blackbox AI, it provides real-time suggestions, code explanations, and debugging help as you write code.

## Features

- **AI Code Assistant**: Get intelligent suggestions and explanations for your code
- **Context-Aware Responses**: The AI understands your code context to provide relevant help
- **Credit System**: Pay-as-you-go model for AI assistance
- **Easy Integration**: Seamlessly integrated into VS Code's interface

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "CodeBox AI"
4. Click Install

## Usage

### Ask the AI Assistant

1. Select code you want help with (or place cursor on a line)
2. Right-click and select "Ask CodeBox AI" from the context menu
3. Type your question in the input box
4. View the AI's response in the sidebar or dedicated panel

### Using the Sidebar

1. Click on the CodeBox AI icon in the activity bar
2. Type your question in the input field at the bottom
3. The AI will respond in the chat interface

### Managing Credits

- View your current credits in the status bar
- Click on the credits indicator to see more details
- Purchase more credits through the "Buy Credits" command

## Commands

CodeBox AI adds the following commands to VS Code:

- `CodeBox AI: Ask AI` - Ask a question about your code
- `CodeBox AI: Show Credits` - Display your current credit balance
- `CodeBox AI: Buy Credits` - Purchase additional credits

## Extension Settings

This extension contributes the following settings:

- `codebox-ai.apiKey`: API Key for CodeBox AI services
- `codebox-ai.model`: AI model to use for code assistance (default, advanced, expert)

## Development

### Building the Extension

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run compile` to compile TypeScript
4. Press F5 to launch the extension in debug mode

### Publishing

1. Install vsce: `npm install -g vsce`
2. Run `vsce package` to create a VSIX file
3. Publish to the marketplace: `vsce publish`

## Credits and Pricing

CodeBox AI operates on a credit system:

- **$10**: 100 Credits
- **$40**: 500 Credits
- **$70**: 1000 Credits

Each AI query typically costs 1 credit.

## Privacy and Data Usage

CodeBox AI processes your code to provide suggestions. Your code is:

- Encrypted in transit
- Not stored permanently
- Not used to train the AI model without explicit consent

## License

This extension is licensed under the MIT License. See the LICENSE file for details.
