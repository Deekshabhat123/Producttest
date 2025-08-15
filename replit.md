# CineHub - Movie Database Application

## Overview

A comprehensive React.js movie database application featuring five pages, search functionality, and full TMDB API integration. Built with Redux state management, TypeScript, and modern web technologies following the specifications from the provided PDF requirements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **State Management**: Redux Toolkit with organized slices
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with Shadcn/UI components
- **Build Tool**: Vite for fast development and optimized builds

### API Integration
- **External API**: TMDB (The Movie Database) API integration
- **Service Layer**: Organized API services with proper error handling
- **Environment**: VITE_TMDB_API_KEY for secure API key management

### Pages Structure
- **Home**: Popular movies with pagination
- **Search Results**: Movie search functionality
- **Movie Details**: Complete movie info with cast details
- **Top Rated**: Highest-rated movies
- **Upcoming**: Upcoming movie releases

## External Dependencies

### Core Dependencies
- **React & Redux**: `react`, `react-dom`, `@reduxjs/toolkit`, `react-redux`
- **TypeScript**: `typescript` for type safety
- **Routing**: `wouter` for lightweight client-side routing
- **Styling**: `tailwindcss`, `@tailwindcss/typography`, `tailwindcss-animate`
- **UI Components**: `@radix-ui` components, `lucide-react` icons
- **Build Tools**: `vite`, `@vitejs/plugin-react`

### API Integration
- **TMDB API**: The Movie Database API for movie data
- **Environment Variable**: `VITE_TMDB_API_KEY` (user-provided secret)

### Development Tools
- **Package Manager**: npm with package-lock.json
- **Development Server**: Vite dev server on port 3000
- **Type Checking**: TypeScript with strict configuration

---

*Last updated: August 15, 2025 - Project completed and ready for GitHub deployment*