# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture

This is a React + Vite frontend application with a minimal setup:

- **Framework**: React 19 with Vite as the build tool
- **Entry point**: `src/main.jsx` renders the App component into the root element
- **Main component**: `src/App.jsx` contains the primary application logic
- **Styling**: CSS files (`App.css`, `index.css`) for component and global styles
- **Assets**: Static assets in `public/` and `src/assets/`

## Key Configuration

- **ESLint**: Configured with React hooks and React refresh plugins in `eslint.config.js`
- **Vite**: Standard React plugin configuration in `vite.config.js`
- **Package management**: Uses npm with lockfile present

## Project Structure

```
src/
├── main.jsx          # Application entry point
├── App.jsx           # Main application component
├── App.css           # App-specific styles
├── index.css         # Global styles
└── assets/           # Static assets (images, etc.)
```

The application uses ES modules (`"type": "module"` in package.json) and modern JavaScript features.