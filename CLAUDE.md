# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality checks
- `pnpm format` - Format code with Prettier using config from package.json

## Code Style Guidelines
- **TypeScript**: Use strict typing with explicit return types; `any` is disallowed
- **Formatting**: Prettier config (singleQuote: true, tabWidth: 2, trailingComma: none, arrowParens: always)
- **Components**: React functional components with TypeScript interfaces for props
- **Imports**: Group in order: React, Next.js, external libraries, internal modules
- **Naming**: PascalCase for components, camelCase for variables/functions, kebab-case for file names
- **UI Components**: Use shadcn/ui components from components/ui/ with Tailwind classes
- **State Management**: React hooks for local state, context for shared state
- **Error Handling**: Try/catch with proper error typing and user-friendly messages
- **ESLint Rules**: No console.log (warning), no unused vars, no explicit any

## Architecture
- Next.js 15 App Router with TypeScript and React 19
- Database: Postgres with Drizzle ORM for type-safe queries
- API: Server components and route handlers with proper error responses
- State Management: React Query for server state, React hooks for UI state

## Code Organization
- **Single Responsibility**: Each file does ONE thing only
- **Component Structure**: Props interface at top, component logic in middle, exports at bottom
- **Separation of Concerns**: UI components separate from business logic
- **Data Fetching**: Use React Server Components for data fetching when possible