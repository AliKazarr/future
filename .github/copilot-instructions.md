# AI Coding Guidelines for Future Project

## Project Overview
This is a React single-page application built with Vite, using modern React 19 features. The app structure is minimal with components in `src/`.

## Architecture
- **Entry Point**: `src/main.jsx` renders `App` component with StrictMode
- **Main Component**: `src/App.jsx` contains the primary UI logic
- **Assets**: Static files in `public/`, component assets in `src/assets/`
- **Styling**: CSS files imported directly in components (`src/App.css`, `src/index.css`)

## Development Workflow
- **Start Dev Server**: `npm run dev` (Vite HMR enabled)
- **Build Production**: `npm run build` (outputs to `dist/`)
- **Linting**: `npm run lint` (ESLint flat config with React hooks and refresh plugins)
- **Preview Build**: `npm run preview`

## Code Patterns
- **JSX Files**: Use `.jsx` extension for React components
- **Imports**: Absolute paths for assets (e.g., `/vite.svg`), relative for local files
- **State Management**: Use React `useState` for local component state
- **ESLint Rules**: 
  - `no-unused-vars` ignores variables starting with uppercase (e.g., component names)
  - Enforces React hooks rules and Vite refresh patterns

## File Structure
```
src/
├── App.jsx          # Main app component
├── main.jsx         # App entry point
├── index.css        # Global styles
├── App.css          # Component styles
└── assets/          # Component-specific assets
```

## Dependencies
- **React 19**: Latest React with concurrent features
- **Vite**: Fast build tool with HMR
- **ESLint**: Modern flat config with React-specific plugins

## Conventions
- Component functions use PascalCase (e.g., `function App()`)
- Event handlers use arrow functions in JSX (e.g., `onClick={() => setCount(count + 1)}`)
- CSS classes applied via `className` attribute</content>
<parameter name="filePath">/home/alikazar/Future/.github/copilot-instructions.md