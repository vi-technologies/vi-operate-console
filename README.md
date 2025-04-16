<div align="center">
  <img src="public/assets/images/Logo.svg" alt="Vi Operate Console Logo" width="180" />
  <h1>Vi Operate Console</h1>
  <p>Advanced AI-powered workforce management and forecasting platform</p>
  
  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=flat-square" alt="Built with Next.js"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square" alt="Language TypeScript"></a>
    <a href="https://ui.shadcn.com"><img src="https://img.shields.io/badge/UI-Shadcn%2FUI-purple?style=flat-square" alt="UI Shadcn/UI"></a>
    <a href="https://vercel.com"><img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square" alt="Deployed on Vercel"></a>
  </p>
</div>

## 📋 Contents

- [📋 Contents](#-contents)
- [🔍 Overview](#-overview)
  - [Target Users](#target-users)
  - [Key Value Propositions](#key-value-propositions)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🧩 Key Concepts](#-key-concepts)
  - [Navigation Structure](#navigation-structure)
- [📸 Screenshots](#-screenshots)
- [📁 File Structure](#-file-structure)
  - [Component Organization](#component-organization)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [💻 Development Workflow](#-development-workflow)
  - [Branch Naming Convention](#branch-naming-convention)
  - [Code Quality Checks](#code-quality-checks)
  - [Pre-commit Hooks](#pre-commit-hooks)
- [🔐 Environment Variables](#-environment-variables)
- [📦 Deployment](#-deployment)
  - [Vercel Deployment](#vercel-deployment)
  - [Manual Deployment](#manual-deployment)
- [🧪 Testing](#-testing)
- [❓ Troubleshooting](#-troubleshooting)
  - [Common Issues](#common-issues)
- [🗺️ Roadmap](#️-roadmap)
- [👥 Contributing](#-contributing)
- [📄 License](#-license)

## 🔍 Overview

Vi Operate Console is a comprehensive workforce management and forecasting platform specifically designed for call centers and other operational environments. The platform leverages artificial intelligence to transform how organizations predict demand, schedule staff, and allocate resources.

### Target Users
- **Call Center Managers**: Monitor performance, optimize staffing levels
- **Workforce Planners**: Develop efficient schedules based on historical patterns
- **Operations Directors**: Track KPIs and make data-driven strategic decisions
- **Agents/Staff**: View schedules, monitor performance metrics, manage time off

### Key Value Propositions
- Reduce operational costs by 15-25% through AI-optimized staffing
- Improve customer satisfaction with automated forecasting
- Increase agent retention through better schedule optimization
- Deliver actionable insights through integrated dashboards and reports

## ✨ Features

- **AI-Powered Forecasting**: Predictive models for call volume, handling time, and staffing needs
- **Dynamic Dashboards**: Real-time monitoring of operational KPIs and agent performance
- **Automated Scheduling**: AI-optimized staff schedules that balance service levels and costs
- **Workflow Automation**: Customizable processes for forecasting, scheduling, and reporting
- **Integration Hub**: Connect with existing telephony systems, CRMs, and HR platforms
- **Alert System**: Proactive notifications for staffing shortages and performance issues

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org) for server components and routing
- **Language**: [TypeScript](https://www.typescriptlang.org) for type safety and developer experience
- **Authentication**: [Auth.js](https://authjs.dev) for secure user authentication
- **Database**: [Postgres](https://vercel.com/postgres) for structured data storage
- **Deployment**: [Vercel](https://vercel.com/docs/concepts/next.js/overview) for seamless deployment
- **Styling**: [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- **Components**: [Shadcn UI](https://ui.shadcn.com/) for accessible, reusable UI components
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) for performance and usage tracking
- **Formatting**: [Prettier](https://prettier.io) for consistent code formatting
- **State Management**: React hooks and context for client-side state
- **AI Integration**: Custom AI models for forecasting and optimization

## 🧩 Key Concepts

The platform revolves around these key resources:

- **Archetypes**: Data models for understanding historical patterns and forecasting future trends
- **Agents**: AI agents that perform specific tasks within workflows (forecasting, scheduling, analysis)
- **Workflows**: Automated processes that deliver forecasting and scheduling outputs
- **Sources**: Data integration points that provide inputs for forecasting and analysis
- **Reports**: Customizable views of historical data, forecasts, and performance metrics

### Navigation Structure

- **Dashboards**: Operational views for call center staffing and management
- **Reports**: Historical analysis and forecasting reports
- **Automations**: Workflows, Agents, Cron Jobs, Triggers, Data Streams
- **Archetypes**: Data models for pattern recognition
- **Sources**: Integration with external data sources

## 📸 Screenshots

<!-- Add 2-3 screenshots showing key features of the application -->
<!-- ![Dashboard View](public/assets/images/screenshots/dashboard.png) -->
<!-- ![Forecasting View](public/assets/images/screenshots/forecasting.png) -->
<!-- ![Agent Performance](public/assets/images/screenshots/agent-performance.png) -->

## 📁 File Structure

The project follows a page-centric architecture using Next.js App Router:

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   ├── console/          # Main application
│   │   ├── page.tsx      # Console home page
│   │   ├── dashboards/   # Dashboard pages
│   │   ├── reports/      # Reports pages
│   │   ├── automations/  # Automation pages
│   │   ├── archetypes/   # Archetype pages
│   │   └── sources/      # Data source pages
│   └── api/              # API routes
│
├── components/           # Reusable UI components
│   ├── _common/          # Common components used across features
│   │   ├── layout/       # Layout components
│   │   ├── ui/           # UI primitives (shadcn/ui)
│   │   └── ux/           # UX components (charts, etc.)
│   └── features/         # Feature-specific components
│
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and services
│   ├── db/               # Database client and operations
│   ├── mock-data/        # Mock data for development
│   ├── services/         # Business logic services
│   └── utils/            # Utility functions
│
└── styles/               # Global styles
```

### Component Organization

The project follows these organization principles:

1. **Page-Centric Structure**: Each page in the `app/` directory represents a route in the application
2. **Component Reuse**: Common components in `components/_common/` are extensively used across different page sections
3. **Feature Isolation**: Each feature (dashboards, reports, etc.) has its own directory with page-specific components
4. **Separation of Concerns**: UI components are separate from business logic (in hooks and services)

This structure allows for:
- Clear separation between pages and reusable components
- Efficient component reuse across different sections
- Easy navigation between related files
- Scalable organization as more features are added

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [pnpm](https://pnpm.io/) (v8.0.0 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-org/vi-operate-console.git
cd vi-operate-console
```

2. Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env
```

3. Install dependencies:

```bash
pnpm install
```

4. Set up the database:

```bash
pnpm db:setup
```

5. Start the development server:

```bash
pnpm dev
```

You should now be able to access the application at http://localhost:3000.

## 💻 Development Workflow

### Branch Naming Convention

- `feature/`: New features or enhancements
- `fix/`: Bug fixes
- `docs/`: Documentation changes
- `refactor/`: Code refactoring
- `test/`: Adding or modifying tests

### Code Quality Checks

We use several tools to ensure code quality:

```bash
# Run ESLint
pnpm lint

# Run TypeScript type checking
pnpm type-check

# Format code with Prettier
pnpm format

# Run all checks
pnpm validate
```

### Pre-commit Hooks

We use [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) to run code quality checks before each commit.

## 🔐 Environment Variables

The following environment variables are required:

```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/vi_operate

# Authentication
AUTH_SECRET=your-auth-secret
NEXTAUTH_URL=http://localhost:3000

# External APIs
API_KEY=your-api-key
```

For a complete list, see `.env.example`.

## 📦 Deployment

### Vercel Deployment

The easiest way to deploy the application is with [Vercel](https://vercel.com):

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure the environment variables
4. Deploy

### Manual Deployment

For manual deployment:

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## 🧪 Testing

We use [Vitest](https://vitest.dev) for unit and integration tests:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## ❓ Troubleshooting

### Common Issues

- **Database connection errors**: Ensure your PostgreSQL server is running and the `DATABASE_URL` is correct
- **Authentication issues**: Check that `AUTH_SECRET` and `NEXTAUTH_URL` are properly configured
- **Build failures**: Make sure all dependencies are installed with `pnpm install`

For more help, check the [issue tracker](https://github.com/your-org/vi-operate-console/issues).

## 🗺️ Roadmap

- **Q2 2025**: Multi-channel forecasting capabilities
- **Q3 2025**: Advanced AI-driven scheduling optimization
- **Q4 2025**: Integration with workforce management systems

## 👥 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
