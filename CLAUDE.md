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
│   ├── ProtectedRoute.jsx      # Route protection wrapper
│   ├── ActivityItem.jsx        # Activity item component
│   ├── RecentActivity.jsx      # Recent activity display
│   ├── generator/              # Template generator components
│   │   ├── ChatInput.jsx       # Chat input component
│   │   ├── ChatMessage.jsx     # Chat message display
│   │   ├── MainChatLayout.jsx  # Main chat layout
│   │   ├── ThreePanelLayout.jsx # Three-panel layout
│   │   └── WelcomeSection.jsx  # Welcome section
│   ├── pricing/                # Pricing page components
│   │   ├── BackButton.jsx      # Back navigation button
│   │   ├── PricingCard.jsx     # Individual pricing card
│   │   └── PricingCards.jsx    # Pricing cards container
│   └── statistics/             # Statistics components
│       ├── ApprovalTrendChart.jsx     # Approval trend chart
│       ├── KPICards.jsx               # KPI cards display
│       └── StatusDistributionChart.jsx # Status distribution chart
├── pages/                      # Page components
│   ├── LandingPage.jsx         # Public landing page
│   ├── LoginPage.jsx           # User authentication
│   ├── SignupPage.jsx          # User registration
│   ├── DashboardPage.jsx       # User dashboard
│   ├── GeneratorPage.jsx       # AI template generator (original)
│   ├── GeneratorPageV2.jsx     # AI template generator (main feature)
│   ├── PricingPage.jsx         # Plan upgrade pricing page
│   ├── StatisticsPage.jsx      # Template approval statistics
│   └── TemplatesPage.jsx       # Template management page
├── data/                       # Data and configuration
│   ├── plans.js                # Pricing plans configuration
│   ├── sampleActivities.js     # Sample activity data
│   └── mock/                   # Mock data files
│       ├── rejectionReasons.json      # Mock rejection reasons
│       ├── templateActivity.json      # Mock template activity
│       └── templateStatistics.json    # Mock statistics data
├── hooks/                      # Custom React hooks
│   └── useAuth.js              # Authentication logic
└── utils/                      # Utility functions
    ├── api.js                  # API communication helpers
    └── jsonParser.js           # JSON parsing utilities for error handling
```

## Key Features

- **AI Template Generator**: Main feature for creating KakaoTalk notification templates with chat interface
- **User Authentication**: Login/signup with protected routes and session management
- **Template Preview**: Real-time preview of generated templates with variable system
- **Template Management**: Create, view, approve, and manage templates with status tracking
- **Plan Upgrade System**: Three-tier pricing (Free/Pro/Max) with feature comparison
- **Statistics Dashboard**: Template approval analytics with charts and KPI tracking
- **Duplicate Prevention**: Smart approval system preventing multiple submissions
- **Error Handling**: Comprehensive error display with user-friendly messages
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS and modern components

## Application Flow

1. **Landing Page** (`/`) - Public homepage
2. **Authentication** (`/login`, `/signup`) - User registration and login
3. **Dashboard** (`/dashboard`) - Protected user dashboard
4. **Template Generator** (`/create`) - AI-powered template creation tool (GeneratorPageV2)
5. **Template Management** (`/templates`) - Template storage and management
6. **Plan Upgrade** (`/pricing`) - Pricing plans and subscription management
7. **Statistics** (`/statistics`) - Template approval statistics and analytics

## Development Configuration

- **Path Alias**: `@` is configured to point to `src/` directory in Vite config
- **Server**: Development server runs on `localhost:5173` with auto-open browser
- **ESLint**: Custom configuration with React hooks and refresh plugins
- **Module System**: Uses ES modules (`"type": "module"` in package.json)

## Korean Development Environment

- Comments and user-facing messages use Korean (한국어)
- HMR (Hot Module Replacement) is properly configured for localhost
- Error handling includes Korean error messages in `jsonParser.js`