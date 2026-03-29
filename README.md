# Trytorial - Tridactyl Interactive Tutorial

An interactive, hands-on tutorial for learning [Tridactyl](https://tridactyl.xyz/), a Vim-style keyboard navigation extension for Firefox.

## Overview

**Trytorial** teaches users how to use Tridactyl through a series of guided exercises. Each chapter focuses on different aspects of modal editing and keyboard navigation:

- **Chapter 1: Introduction** - Learn about modes and core Tridactyl concepts
- **Chapter 2: Normal Mode** - Master scrolling, navigation, and text selection
- **Chapter 3: Hint Mode** - Click links and copy URLs from the keyboard
- **Chapter 4: Visual Mode** - Select and yank text
- **Chapter 5: Command Mode** - Run ex-commands

## Features

- 🎯 **Interactive Exercises** - Learn by doing, with real-time feedback
- 🎨 **Visual Mode Labels** - Like Hint mode, but for selecting text blocks
- 🔄 **Multi-key Sequences** - Support for Vim-like key combinations (gg, yy, zi, zo, zz)
- 📊 **Progress Tracking** - See how many exercises you've completed
- 🎮 **Fake Browser** - Realistic practice environment with simulated browser UI
- ⌨️ **Keyboard Focus** - Learn keyboard-first navigation with no mouse required

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### Build for Production

```bash
npm run build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for best performance.

## Project Structure

```
├── public/              # Static assets and SVG logos
├── src/
│   ├── components/      # React components
│   │   ├── BrowserSimulator.js    # Fake browser UI
│   │   ├── Sidebar.js             # Chapter/exercise navigation
│   │   ├── LessonPanel.js         # Theory and task display
│   │   ├── Notification.js        # Feedback messages
│   │   └── FakeLink.js            # Links with hint labels
│   ├── hooks/           # Custom React hooks
│   │   ├── useKeyboardHandler.js  # Keyboard input capture and mode routing
│   │   └── useExerciseLogic.js    # Exercise completion logic
│   ├── constants/       # Application constants
│   │   ├── chapters.js            # Exercise definitions
│   │   ├── links.js               # Fake page links and labels
│   │   ├── modes.js               # Modal editor modes
│   │   └── index.js               # Constants exports
│   ├── App.js          # Main application component
│   └── index.js        # React entry point
└── package.json        # Project dependencies
```

## How It Works

### Modes

Trytorial implements 5 modal editor modes:

- **NORMAL** (Cyan) - Default mode for navigation
- **COMMAND** (Purple) - Execute ex-commands with `:` prefix
- **HINT** (Orange) - Label and click links
- **VISUAL** (Orange) - Select text blocks with labels
- **IGNORE** (Gray) - Pass all keys to the page

### Keyboard Handler

The `useKeyboardHandler` hook captures window-level keydown events and:

1. Routes input to the appropriate mode handler
2. Manages multi-key sequences with 1-second timeout
3. Updates visual state (selection, zoom, hints)
4. Triggers exercise completion checks

### Exercise Types

- **key** - Single key press
- **keycount** - Key pressed N times
- **seq** - Two-key sequence (e.g., "gg")
- **enterMode** - Successfully enter a mode
- **exitMode** - Successfully exit a mode
- **inMode** - Perform action within a mode
- **hintSelect** - Select a link in Hint mode
- **visual** - Visual mode text selection

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Esc` | Return to Normal mode |
| `:` | Enter Command mode |
| `f` | Enter Hint mode (follow links) |
| `;y` | Enter Hint mode (copy URL) |
| `v` | Enter Visual mode |
| `j/k` | Scroll down/up in Normal mode |
| `g` `g` | Jump to page top |
| `G` | Jump to page bottom |
| `y` `y` | Copy URL/yank selection |
| `z` `i` | Zoom in (10% increase) |
| `z` `o` | Zoom out (10% decrease) |
| `z` `z` | Reset zoom (only if zoomed) |

## Technologies

- **React 19.2.4** - UI framework with hooks
- **JavaScript** - Pure JS, no TypeScript
- **CSS-in-JS** - Inline styles for custom theming

## Development Tips

- **State Management** - App.js manages all state; hooks receive props and callbacks
- **Keyboard Events** - useKeyboardHandler listens at window level for global capture
- **Refs Sync** - Keyboard handler uses refs for immediate state access in event listeners
- **Exercise Completion** - All doComplete() calls require setExerciseIdx for auto-advance
- **Visual Selection** - Multiple modes track state separately

## License

MIT License - feel free to use this project for learning and teaching.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [Tridactyl](https://tridactyl.xyz/) - The Vim browser extension that inspired this tutorial
- [Vim](https://www.vim.org/) - The legendary modal text editor
