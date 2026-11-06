# Mercy Ndanu — Developer Portfolio & CMS

A high-performance portfolio and administrative Content Management System (CMS) for Mercy Ndanu, built with Next.js 16 (App Router with Turbopack), React 19, TypeScript, Tailwind CSS, Motion, and Firebase Firestore/Auth.

---

## Architecture Overview

```text
├── src/
│   ├── app/                          # Next.js App Router (File-based Routing)
│   │   ├── layout.tsx                # Global Root Layout & Metadata
│   │   ├── page.tsx                  # Public Portfolio Page (/)
│   │   ├── globals.css               # Tailwind CSS v4 Theme & Custom Directives
│   │   ├── login/
│   │   │   └── page.tsx              # Admin Authentication Gateway (/login)
│   │   └── admin/                    # Protected CMS Area
│   │       ├── layout.tsx            # CMS Sidebar & Auth Guard
│   │       ├── page.tsx              # Admin Overview Dashboard (/admin)
│   │       ├── projects/page.tsx     # Project CRUD (/admin/projects)
│   │       ├── hero/page.tsx         # Bio & Profile Editor (/admin/hero)
│   │       ├── certifications/page.tsx# Certifications Manager (/admin/certifications)
│   │       ├── messages/page.tsx     # Inquiries Inbox (/admin/messages)
│   │       └── settings/page.tsx     # System Status & Config (/admin/settings)
│   ├── components/                   # Interactive UI Components
│   │   ├── PublicPortfolio.tsx       # Public showcase
│   │   ├── CmsLogin.tsx              # OAuth sign-in interface
│   │   ├── CmsSidebar.tsx            # Sticky navigation sidebar
│   │   ├── CmsDashboard.tsx          # Analytics & quick actions
│   │   ├── CmsProjects.tsx           # Projects data editor
│   │   ├── CmsHeroAbout.tsx          # Hero section configuration
│   │   ├── CmsCertifications.tsx     # Credentials manager
│   │   ├── CmsMessages.tsx           # Messages inbox
│   │   └── CmsSettings.tsx           # System diagnostics & permissions
│   ├── context/
│   │   └── PortfolioContext.tsx      # Central reactive state & cloud data synchronization
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── config.ts             # Firebase client singleton
│   │   │   └── services.ts           # Typesafe Firestore & Auth service operations
│   │   └── validations.ts            # Zod validation schemas for forms and entities
│   ├── types/
│   │   └── index.ts                  # Shared TypeScript interfaces & types
│   └── data.ts                       # Default fallback data & offline persistence
├── next.config.ts                    # Next.js configuration (Remote image domains)
├── postcss.config.mjs                # PostCSS & Tailwind CSS v4 pipeline
└── tsconfig.json                     # Strict TypeScript configuration
```

---

## Getting Started

### Prerequisites
- Node.js 20+ or 22+
- npm or pnpm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Typecheck & Build

```bash
# Verify TypeScript types
npm run typecheck

# Create optimized production build
npm run build

# Start production server
npm run start
```
