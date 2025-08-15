# Overview

This is a full-stack movie discovery application built with React, Express, and PostgreSQL. The application allows users to browse popular movies, top-rated films, upcoming releases, search for specific movies, and view detailed information about individual films including cast and crew details. The frontend provides an elegant cinema-themed interface with responsive design, while the backend serves as an API foundation with database integration capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing without the overhead of React Router
- **State Management**: Redux Toolkit for predictable state management and React Query for server state caching
- **Styling**: Tailwind CSS with shadcn/ui components for consistent, accessible UI design
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Development Mode**: Vite integration for hot module replacement in development
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development and database implementation for production

## Component Design Patterns
- **UI Components**: Radix UI primitives wrapped with shadcn/ui for accessibility and consistency
- **Custom Components**: Domain-specific components (MovieCard, CastCard, LoadingSpinner) for reusable functionality
- **Layout Components**: Responsive navigation and pagination components

## State Management Strategy
- **Redux Slices**: Organized by feature (movies) with separate state for popular, top-rated, upcoming, search, and detail views
- **Async Actions**: Redux Toolkit Query integration for API calls with proper loading and error states
- **Client-side Caching**: React Query for efficient data fetching and background updates

## Database Schema Design
- **User System**: Basic user authentication schema with username/password fields
- **PostgreSQL**: Primary database with UUID generation for unique identifiers
- **Migration System**: Drizzle Kit for database schema migrations and version control

## API Integration
- **TMDB API**: The Movie Database API for fetching movie data, images, and metadata
- **Image Handling**: Centralized image URL generation with fallback handling for missing assets
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages

## Development Workflow
- **TypeScript Configuration**: Strict type checking with path mapping for clean imports
- **Hot Reload**: Vite integration for instant feedback during development
- **Code Organization**: Feature-based folder structure with shared utilities and types

# External Dependencies

## Third-party APIs
- **TMDB API**: The Movie Database API for movie data, ratings, cast information, and high-quality poster images
- **API Key Management**: Environment variable configuration for secure API key storage

## Database Services
- **Neon Database**: PostgreSQL-compatible serverless database for production deployment
- **Connection Pooling**: Efficient database connection management through Drizzle ORM

## UI Component Libraries
- **Radix UI**: Headless, accessible component primitives for complex UI interactions
- **shadcn/ui**: Pre-styled component library built on Radix UI with consistent design tokens
- **Lucide Icons**: Comprehensive icon library for consistent visual elements

## Development Tools
- **Replit Integration**: Native Replit development environment support with runtime error overlay
- **PostCSS**: CSS processing pipeline for Tailwind CSS optimization
- **ESBuild**: Fast JavaScript bundling for production builds

## State Management Dependencies
- **Redux Toolkit**: Modern Redux with built-in best practices and reduced boilerplate
- **React Query**: Server state management with caching, background updates, and offline support
- **React Hook Form**: Performant form handling with validation support