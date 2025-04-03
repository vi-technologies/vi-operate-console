<div align="center"><strong>Vi Operate Console</strong></div>
<div align="center">Built with Next.js 15 App Router</div>
<br />

## Overview

Vi Operate Console is a workforce management and forecasting platform for call centers and other operational environments. The platform uses AI agents and workflows to automate forecasting, scheduling, and resource allocation.

### Tech Stack

- Framework - [Next.js 15 (App Router)](https://nextjs.org)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [Auth.js](https://authjs.dev)
- Database - [Postgres](https://vercel.com/postgres)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn UI](https://ui.shadcn.com/)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Formatting - [Prettier](https://prettier.io)

## Key Concepts

The platform revolves around these key resources:

- **Archetypes**: Data models for understanding historical patterns
- **Agents**: AI agents that perform specific tasks within workflows
- **Workflows**: Automated processes that deliver forecasting and scheduling

### Navigation Structure

- **Dashboards**: Operational views for call center staffing and management
- **Reports**: Historical analysis and forecasting reports
- **Automations**: Workflows, Agents, Cron Jobs, Triggers, Data Streams
- **Archetypes**: Data models for pattern recognition
- **Sources**: Integration with external data sources

## Getting Started

1. Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env
```

2. Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

You should now be able to access the application at http://localhost:3000.
