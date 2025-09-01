# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture

This is a React + Vite frontend application for a KakaoTalk notification template generator:

- **Framework**: React 19 with Vite as the build tool
- **Routing**: React Router DOM for client-side routing
- **Styling**: Tailwind CSS with custom styles
- **State Management**: Zustand for global state management
- **Authentication**: Protected routes with authentication system
- **Entry point**: `src/main.jsx` renders the App component into the root element

## Key Technologies

- **React Router DOM**: Client-side routing with protected routes
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **TypeScript**: Type definitions included
- **ESLint**: Configured with React hooks and React refresh plugins
- **Vite**: Fast build tool with React plugin

## Project Structure

```
src/
├── main.jsx                    # Application entry point
├── App.jsx                     # Main router and route configuration
├── App.css                     # App-specific styles
├── index.css                   # Global styles and Tailwind imports
├── components/                 # Reusable UI components
│   ├── Header.jsx              # Navigation header
│   ├── Footer.jsx              # Page footer
│   └── ProtectedRoute.jsx      # Route protection wrapper
├── pages/                      # Page components
│   ├── LandingPage.jsx         # Public landing page
│   ├── LoginPage.jsx           # User authentication
│   ├── SignUpPage.jsx          # User registration
│   ├── DashboardPage.jsx       # User dashboard
│   └── GeneratorPage.jsx       # AI template generator (main feature)
├── hooks/                      # Custom React hooks
│   └── useAuth.js              # Authentication logic
└── utils/                      # Utility functions
    └── api.js                  # API communication helpers
```

## Key Features

- **AI Template Generator**: Main feature for creating KakaoTalk notification templates
- **User Authentication**: Login/signup with protected routes
- **Template Preview**: Real-time preview of generated templates
- **Variable System**: Dynamic template variables with sample values
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## Application Flow

1. **Landing Page** (`/`) - Public homepage
2. **Authentication** (`/login`, `/signup`) - User registration and login
3. **Dashboard** (`/dashboard`) - Protected user dashboard
4. **Template Generator** (`/create`) - AI-powered template creation tool
5. **Template Management** (`/templates`) - Template storage and management (in development)

The application uses ES modules (`"type": "module"` in package.json) and modern JavaScript features.