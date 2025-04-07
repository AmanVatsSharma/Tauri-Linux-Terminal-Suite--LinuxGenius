# Linux Terminal AI Assistant Suite

A modern desktop application for Linux that provides an AI-enhanced terminal experience. Built with Tauri, React, TypeScript, and LangGraph.

## Features

- **AI-Powered Terminal**: Execute commands with real-time AI analysis
- **Command Analysis**: Get security insights and optimization suggestions
- **Intelligent Suggestions**: Receive context-aware command suggestions
- **Modern UI**: Clean, dark-themed interface optimized for terminal work

## Technology Stack

- **Frontend**: React, TypeScript, Xterm.js
- **Backend**: Rust, Tauri
- **AI**: LangChain, LangGraph with OpenAI integration

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Rust (latest stable)
- Linux system with the following dependencies:
  - libwebkit2gtk-4.1-dev
  - libgtk-3-dev
  - libayatana-appindicator3-dev
  - librsvg2-dev

### Installation

1. Clone the repository
```bash
git clone https://github.com/AmanVatsSharma/Tauri-Linux-Terminal-Suite--LinuxGenius
cd linux-terminal-suite
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run tauri dev
```

### Building

To build the application:

```bash
npm run tauri build
```

## Usage

1. Launch the application
2. Enter your OpenAI API key in the sidebar
3. Start typing commands in the terminal
4. View AI analysis and suggestions in the sidebar

## Development

The project structure is organized as follows:

- `src/` - React frontend code
  - `components/` - React components including Terminal and AIAgent
  - `utils/` - Utility functions and AI agent implementation
- `src-tauri/` - Rust backend code
  - `src/` - Rust source files
  - `capabilities/` - Tauri capability configurations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
