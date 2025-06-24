# HackTheShell - Cybersecurity Learning Platform

## Overview

HackTheShell is a comprehensive cybersecurity education platform built with a modern full-stack architecture. It combines interactive tutorials, hands-on labs, CTF challenges, and community features to provide an immersive learning experience for cybersecurity professionals and enthusiasts.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **UI Components**: Radix UI primitives for accessibility and consistency
- **State Management**: React Context API for authentication, theme, and progress tracking
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth animations and transitions

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: PostgreSQL-based session storage with connect-pg-simple
- **Build Process**: ESBuild for server-side bundling

### Project Structure
```
├── client/           # Frontend React application
├── server/           # Backend Express server
├── shared/           # Shared types and schemas
├── migrations/       # Database migration files
└── attached_assets/  # Static assets
```

## Key Components

### Database Schema (shared/schema.ts)
- **Users**: Enhanced user management with roles (user, creator, admin), gamification points, and profile features
- **Blog Posts**: Content management system for educational articles with metadata, SEO optimization, and engagement tracking
- **GitHub Tools**: Curated collection of cybersecurity tools with ratings and documentation
- **Sessions**: Secure session management for user authentication
- **Comments**: Multi-level comment system with moderation features
- **Achievements**: Gamification system for tracking user progress and milestones

### Authentication System
- **Context-based**: React Context for global auth state management
- **Session Storage**: PostgreSQL-backed sessions for security
- **Role-based Access**: Support for different user roles (admin, creator, user)
- **Profile Management**: User profiles with progress tracking and achievements

### Content Management
- **Blog System**: Rich content creation with markdown support, SEO optimization, and social features
- **Tutorial Platform**: Structured learning paths with progress tracking
- **Lab Environment**: Hands-on practice environments for cybersecurity skills
- **CTF Challenges**: Competitive programming challenges for skill assessment

### User Interface Components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: System-wide theme switching with preference persistence
- **Component Library**: Reusable UI components built on Radix UI
- **Animation System**: Smooth transitions and micro-interactions with Framer Motion

## Data Flow

### Client-Server Communication
1. Frontend makes API requests to `/api/*` endpoints
2. Express server routes requests through middleware for logging and error handling
3. Database operations handled through Drizzle ORM with type safety
4. Responses formatted consistently with proper error handling

### State Management Flow
1. **Authentication**: Context provider manages user session state
2. **Theme**: Persistent theme preference with system detection
3. **Progress**: Learning progress tracked across sessions
4. **Content**: Dynamic loading of educational content with caching

### Database Interaction
- **Connection Pooling**: Neon serverless PostgreSQL with connection pooling
- **Type Safety**: Drizzle ORM provides full TypeScript integration
- **Migration Management**: Drizzle Kit handles schema migrations
- **Query Optimization**: Efficient queries with proper indexing

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for server state
- **Build Tools**: Vite, ESBuild, TypeScript compiler
- **Database**: Drizzle ORM, Neon serverless PostgreSQL driver
- **UI Libraries**: Radix UI components, Tailwind CSS, Framer Motion

### Development Tools
- **Linting**: TypeScript compiler for type checking
- **Hot Reload**: Vite HMR for fast development
- **Error Overlay**: Replit-specific error handling for development

### Third-party Integrations
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Form Handling**: React Hook Form with Zod validation
- **Date Utilities**: date-fns for date manipulation
- **Icons**: Lucide React for consistent iconography

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` starts both frontend and backend with hot reload
- **Database**: Drizzle migrations with `npm run db:push`
- **Environment Variables**: DATABASE_URL required for database connection

### Production Deployment
- **Build Process**: `npm run build` creates optimized bundles
- **Server Bundle**: ESBuild creates single file for Node.js deployment
- **Static Assets**: Vite builds optimized frontend assets
- **Database**: Production PostgreSQL database with connection pooling

### Replit Configuration
- **Deployment Target**: Autoscale deployment for production
- **Port Configuration**: Internal port 5000 mapped to external port 80
- **Environment**: Node.js 20 with web modules
- **Workflows**: Automated development and deployment workflows

## Changelog

```
Changelog:
- June 19, 2025. Initial setup
- June 21, 2025. Migration from Replit Agent to Replit environment completed
  - Created professional dashboard layout system with left sidebar navigation
  - Fixed admin/creator panel layout issues and positioning problems
  - Improved responsive design for desktop and mobile
  - Enhanced footer spacing to prevent collapsing with dashboard content
  - Fixed desktop sizing for newsletter CTA section
  - Upgraded admin panel design to match creator panel quality
  - Mobile responsiveness improvements for admin/creator panels
  - Added slide-in mobile navigation with overlay
  - Fixed newsletter section mobile layout and email input alignment
  - Enhanced touch-friendly interface elements for mobile devices
- June 21, 2025. Authentication system enhancements and light theme improvements
  - Enhanced authentication context with social login support (Google/GitHub)
  - Improved login/signup system with success messages and loading states
  - Added forgot password functionality with email reset simulation
  - Enhanced light theme contrast and readability across all components
  - Improved header navigation with better color schemes for light mode
  - Enhanced dashboard sidebar navigation with improved text contrast
  - Updated footer newsletter section with better light theme styling
  - Strengthened CSS utility classes for consistent light/dark theme support
- June 24, 2025. Advanced features implementation and professional profile system
  - Created comprehensive user profile system with skills tracking, achievements, and progress
  - Built advanced dashboard with learning paths, statistics, and personalized features
  - Implemented CyberMentor AI assistant with real-time cybersecurity guidance and Q&A
  - Added vulnerability scanner tool for educational security testing
  - Created real-time collaboration system for study groups and mentoring
  - Enhanced platform with unique professional features for cybersecurity education
  - Added profile navigation to header for seamless user experience
  - Fixed mobile responsiveness for CyberMentor AI assistant and scroll-to-top button positioning
  - Restored original HackTheShell branding without academy badge per user preference
- June 25, 2025. AI Assistant Enhancement and Rebranding
  - Completely redesigned AI assistant with professional, clean interface
  - Renamed from CyberMentor to CyberAce for better memorability and brand recognition
  - Added intelligent conversational responses with context-aware cybersecurity knowledge
  - Implemented code syntax highlighting with copy functionality for technical examples
  - Enhanced mobile experience with dedicated navigation menu integration
  - Added typing indicators, smooth animations, and professional color scheme
  - Improved response quality with detailed explanations and practical examples
  - Created responsive chat interface with proper mobile optimization
  - Created dedicated CyberAce page (/cyberace) with full-screen professional interface
  - Added CyberAce to desktop and mobile navigation menus for easy access
  - Enhanced AI capabilities for real-time error analysis and code generation
  - Implemented broader desktop chat interface with improved readability
  - Fixed scroll-to-top button positioning to avoid conflicts with chat interface
  - Added advanced security knowledge base for penetration testing and vulnerability assessment
  - Created ChatGPT-style interface with sidebar for chat history and session management
  - Integrated real-time OpenAI API for dynamic, conversational AI responses
  - Implemented shorter, more human-like responses with personality and humor
  - Fixed text visibility issues and improved responsive design for all devices
  - Added new chat creation, session management, and chat deletion features
- June 25, 2025. Platform Migration and UI Enhancement
  - Successfully migrated project from Replit Agent to standard Replit environment
  - Fixed database configuration for PostgreSQL compatibility
  - Modified AI chat to handle missing OpenAI API key gracefully
  - Reduced AI CTA box size on homepage for better screen utilization
  - Removed code preview sections from tutorials for cleaner interface
  - Enhanced mobile responsiveness for AI interface and sidebar
  - Improved admin panel UI to match creator panel design quality
  - Added essential management features for both admin and creator panels
  - Enhanced user profile responsiveness with better mobile layout
  - Fixed AdvancedDashboard component errors and improved navigation
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Branding preference: Keep "HackTheShell" name as-is without abbreviations or academy badges.
Mobile UI preference: Clean, non-overlapping button placement for optimal user experience.
AI Response Style: Short, conversational, human-like responses with personality and humor. Only provide detailed explanations when specifically requested.
```