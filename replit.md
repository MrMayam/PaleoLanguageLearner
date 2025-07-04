# Paleo Hebrew Learning App

## Overview

This is a comprehensive educational application designed to teach children Paleo Hebrew characters through interactive games and learning modules. The app combines modern web technologies with gamification elements to create an engaging learning experience for kids.

## System Architecture

The application follows a full-stack architecture with a clear separation between frontend and backend components:

**Frontend Architecture:**
- React-based single-page application with TypeScript
- Vite for development and build tooling
- Wouter for client-side routing
- TailwindCSS for styling with a kid-friendly color palette
- Shadcn/ui component library for consistent UI elements
- TanStack Query for state management and API communication

**Backend Architecture:**
- Express.js server with TypeScript
- RESTful API design with structured error handling
- Modular route organization
- Storage abstraction layer supporting both in-memory and database persistence

**Database Layer:**
- PostgreSQL database with Drizzle ORM
- Schema-first approach with TypeScript integration
- Neon Database integration for serverless PostgreSQL

## Key Components

### Frontend Components
- **App Header**: Displays user progress, stars, and mascot
- **Navigation Bar**: Bottom navigation with colorful, kid-friendly icons
- **Character Card**: Interactive cards for each Paleo Hebrew character
- **Achievement Badge**: Gamification elements showing unlocked achievements
- **Celebration Modal**: Positive reinforcement for completed activities

### Learning Modules
1. **Alphabet Learning**: Interactive character introduction with audio pronunciation
2. **Sound Games**: Audio-based matching games to reinforce character sounds
3. **Word Building**: Drag-and-drop interface for constructing ancient words
4. **Tracing Practice**: Canvas-based character tracing for motor skill development
5. **Progress Tracking**: Comprehensive statistics and achievement system

### Audio System
- Web Audio API integration for sound effects
- Speech Synthesis API for character pronunciation
- Context-based audio management with preloading capabilities

## Data Flow

1. **User Authentication**: Demo user (ID: 1) for development
2. **Character Loading**: Static character data with authentic Paleo Hebrew information
3. **Progress Tracking**: Real-time updates to user progress stored in database
4. **Achievement System**: Automatic achievement unlocking based on user activities
5. **Gamification**: Star system and progress percentages to motivate learning

## External Dependencies

### Core Dependencies
- **React 18**: UI framework with hooks and modern patterns
- **TypeScript**: Type safety across the entire codebase
- **TailwindCSS**: Utility-first CSS framework
- **Drizzle ORM**: Type-safe database operations
- **TanStack Query**: Server state management and caching

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library with educational-themed icons
- **Embla Carousel**: Touch-friendly carousel components

### Development Tools
- **Vite**: Fast development server and build tool
- **ESBuild**: JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

## Deployment Strategy

**Development Environment:**
- Replit integration with live reload
- Vite development server on port 5000
- PostgreSQL 16 module for database services
- Hot module replacement for fast development

**Production Build:**
- Vite builds client assets to `dist/public`
- ESBuild bundles server code to `dist/index.js`
- Static file serving through Express
- Database migrations via Drizzle Kit

**Environment Configuration:**
- NODE_ENV-based configuration switching
- DATABASE_URL for PostgreSQL connection
- Replit-specific optimizations and plugins

The application is designed to scale from development to production with minimal configuration changes, supporting both local development and cloud deployment scenarios.

## Changelog

```
Changelog:
- June 27, 2025. Initial setup with complete Paleo Hebrew learning app
- June 27, 2025. Enhanced audio system with Morgan Freeman-style voice synthesis
- June 27, 2025. Integrated authentic Paleo Hebrew character pronunciation
- June 27, 2025. Fixed Button import error in progress page
- June 27, 2025. Created Pixar-style hyper-realistic character designs with 3D shading
- June 27, 2025. Added diverse cartoon characters throughout all learning modules
- June 27, 2025. Enhanced visual appeal with detailed gradients and expressive features
- June 27, 2025. Replaced SVG illustrations with user-provided character images
- June 27, 2025. Updated character showcase and learning companion components for image display
- June 27, 2025. Implemented comprehensive monetization system with Stripe integration
- June 27, 2025. Added subscription management (monthly $4.99, yearly $39.99, school $299)
- June 27, 2025. Created character pack store with individual purchases ($2.99-$3.99)
- June 27, 2025. Built parent dashboard with detailed progress analytics
- June 27, 2025. Added premium features: offline content, parent reports, achievement tracking
- June 27, 2025. Integrated school licensing system for educational institutions
- June 27, 2025. Enhanced audio system with Morgan Freeman-style voice synthesis for all character pronunciation
- June 27, 2025. Updated voice configurations with deep, authoritative tone (0.6 pitch, 0.7 rate)
- June 27, 2025. Created authentic narrative introductions for Paleo Hebrew character sounds
- June 27, 2025. Fixed deployment issues by making Stripe integration optional
- June 27, 2025. Successfully built production version with all assets (410KB client, 30.8KB server)
- June 27, 2025. Resolved blue-green screen deployment error with proper HTML metadata and error handling
- June 27, 2025. Converted app to Progressive Web App (PWA) with complete offline functionality
- June 27, 2025. Created service worker for caching, background sync, and push notifications
- June 27, 2025. Generated app icons from character artwork for all device sizes (16px to 512px)
- June 27, 2025. Added PWA manifest with shortcuts for alphabet, games, and tracing sections
- June 27, 2025. Implemented smart install prompts for both Android and iOS devices
- June 27, 2025. Added PWA installation component with device-specific instructions
- June 27, 2025. Created native mobile app configuration with Capacitor for iOS App Store and Google Play Store
- June 27, 2025. Added Android and iOS native projects with proper app metadata and configuration
- June 27, 2025. Created comprehensive app store deployment guide with submission requirements
- June 27, 2025. Set up build scripts and deployment workflows for both app stores
- June 27, 2025. Implemented Google Bubblewrap PWA to Play Store deployment with HTTPS requirements
- June 27, 2025. Added Bubblewrap CLI tools and automated build scripts for Trusted Web Activity packaging
- June 27, 2025. Created Digital Asset Links configuration for full-screen PWA operation on Android
- June 27, 2025. Optimized PWA manifest for Play Store deployment with categories and maskable icons
- June 27, 2025. Built complete deployment pipeline supporting both native Capacitor and Bubblewrap PWA methods
- June 27, 2025. Configured final app deployment details: name "Hebrew Basics", description "Learn basic paleo hebrew"
- June 27, 2025. Updated all deployment files with simplified branding for Google Play Store submission
- June 27, 2025. Fixed PWABuilder icon Content-Type error by creating proper PNG icon files
- June 27, 2025. Resolved 500 error preventing Android package generation for Google Play Store
- June 27, 2025. Fixed PWABuilder PNG corruption errors and manifest validation issues
- June 27, 2025. Added share target route handler and updated all icon references to PNG format
- June 27, 2025. Installed new diverse children Hebrew logo across all icon sizes (72x72 to 1024x1024)
- June 27, 2025. Added HTTPS enforcement middleware and security headers for production deployment
- June 27, 2025. Configured Digital Asset Links for TWA validation and Google Play Store submission
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```