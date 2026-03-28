# SRP Web - Project Guide

Complete guide for developers working on the SRP global website.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [Coding Standards](#coding-standards)
4. [Component Guidelines](#component-guidelines)
5. [Git Workflow](#git-workflow)
6. [Pre-commit Requirements](#pre-commit-requirements)

---

## Project Overview

**SRP Web** is the global landing page for SRP, built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

**Tech Stack:**

- Framework: Next.js 15 (App Router)
- Language: TypeScript 5
- Styling: Tailwind CSS 3.4
- React: v19
- Node: v22.21.1

---

## Folder Structure

### Recommended Structure

```
src/
├── app/                              # Next.js App Router
│   ├── (landing)/                   # Landing page route group
│   │   ├── page.tsx                 # Home page
│   │   ├── layout.tsx               # Landing layout
│   │   └── _sections/               # Private folder (not routable)
│   │       ├── Hero.tsx             # Hero section
│   │       ├── Features.tsx         # Features section
│   │       ├── About.tsx            # About section
│   │       ├── Services.tsx         # Services section
│   │       ├── Team.tsx             # Team section
│   │       ├── Testimonials.tsx     # Testimonials section
│   │       ├── Partners.tsx         # Partners section
│   │       ├── CTA.tsx              # Call to action
│   │       └── Footer.tsx           # Footer section
│   │
│   ├── about/page.tsx               # About page
│   ├── services/page.tsx            # Services page
│   ├── contact/page.tsx             # Contact page
│   ├── api/                         # API routes
│   │   ├── contact/route.ts        # Contact form handler
│   │   └── newsletter/route.ts     # Newsletter signup
│   │
│   ├── layout.tsx                   # Root layout
│   ├── globals.css                  # Global styles
│   └── not-found.tsx                # 404 page
│
├── components/                       # Reusable components
│   ├── ui/                          # UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Container.tsx
│   │   └── Section.tsx
│   │
│   ├── layout/                      # Layout components
│   │   ├── Header.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   │
│   ├── forms/                       # Form components
│   │   ├── ContactForm.tsx
│   │   └── NewsletterForm.tsx
│   │
│   └── shared/                      # Shared components
│       ├── Logo.tsx
│       ├── SocialLinks.tsx
│       └── AnimatedSection.tsx
│
├── lib/                             # Core utilities
│   ├── utils.ts                     # Helper functions (use cn for classnames)
│   ├── constants.ts                 # App-wide constants
│   └── validations.ts               # Form validation schemas
│
├── hooks/                           # Custom React hooks
│   ├── useScrollPosition.ts
│   ├── useMediaQuery.ts
│   └── useIntersectionObserver.ts
│
├── types/                           # TypeScript definitions
│   ├── index.ts                     # Shared types
│   ├── api.ts                       # API types
│   └── components.ts                # Component prop types
│
├── config/                          # Configuration
│   ├── site.ts                      # Site metadata (title, description, etc.)
│   ├── navigation.ts                # Navigation links
│   └── seo.ts                       # SEO defaults
│
├── data/                            # Static data (easy for interns to edit)
│   ├── team.ts                      # Team members
│   ├── services.ts                  # Services offered
│   ├── testimonials.ts              # Client testimonials
│   └── partners.ts                  # Partner companies
│
└── scripts/                         # Build scripts
    └── pre-commit-ci.sh             # Pre-commit validation
```

### Folder Naming Rules

- **Lowercase with dashes**: Use kebab-case for folders (`my-component`, not `MyComponent`)
- **Route groups**: Use `(name)` for grouping without URL segments
- **Private folders**: Prefix with `_` to exclude from routing (`_sections`, `_utils`)
- **Collections**: Plural names for collections (`components`, `hooks`, `types`)

---

## Coding Standards

### TypeScript

#### 1. Type Everything

```typescript
// ✅ Good
interface ButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, children, onClick }: ButtonProps) {
  // ...
}

// ❌ Bad
export function Button({ variant, children, onClick }: any) {
  // ...
}
```

#### 2. Avoid `any`

Use `unknown` or proper types instead.

```typescript
// ✅ Good
function handleData(data: unknown) {
  if (typeof data === "string") {
    console.log(data.toUpperCase());
  }
}

// ❌ Bad
function handleData(data: any) {
  console.log(data.toUpperCase());
}
```

#### 3. Use Type Inference

Let TypeScript infer when obvious:

```typescript
// ✅ Good
const name = "SRP"; // TypeScript infers string

// ❌ Unnecessary
const name: string = "SRP";
```

### React

#### 1. Functional Components Only

```typescript
// ✅ Good
export function MyComponent() {
  return <div>Hello</div>;
}

// ❌ Bad - no class components
export class MyComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}
```

#### 2. Named Exports (Preferred)

```typescript
// ✅ Preferred
export function Button() {}

// ✅ Acceptable for pages
export default function HomePage() {}
```

#### 3. Component File Structure

```typescript
// 1. Imports
import { useState } from "react";
import { cn } from "@/lib/utils";

// 2. Types
interface ButtonProps {
  variant: "primary" | "secondary";
}

// 3. Component
export function Button({ variant }: ButtonProps) {
  const [clicked, setClicked] = useState(false);

  return <button className={cn("btn", variant)}>{/* ... */}</button>;
}

// 4. Sub-components (if needed)
function ButtonIcon() {
  return <span>→</span>;
}
```

### Tailwind CSS

#### 1. Use Tailwind Utility Classes

```tsx
// ✅ Good
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">

// ❌ Bad - avoid custom CSS when possible
<div className="custom-card">
```

#### 2. Use `cn()` for Conditional Classes

```tsx
import { cn } from "@/lib/utils";

<button
  className={cn(
    "px-4 py-2 rounded",
    variant === "primary" && "bg-blue-600 text-white",
    variant === "secondary" && "bg-gray-200 text-gray-900"
  )}
/>;
```

#### 3. Responsive Design

Mobile-first approach:

```tsx
<div className="text-sm md:text-base lg:text-lg">
  // Small by default, medium on tablets, large on desktop
</div>
```

### File Naming

- **Components**: PascalCase (`Button.tsx`, `ContactForm.tsx`)
- **Utilities**: camelCase (`utils.ts`, `validations.ts`)
- **Constants**: camelCase (`constants.ts`, `navigation.ts`)
- **Pages**: lowercase (`page.tsx`, `layout.tsx`)

### Import Order

```typescript
// 1. React & Next.js
import { useState } from "react";
import Image from "next/image";

// 2. External libraries
import { motion } from "framer-motion";

// 3. Internal - absolute imports with @/
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

// 4. Relative imports (avoid when possible)
import { helper } from "./utils";
```

---

## Component Guidelines

### UI Components (`components/ui/`)

Reusable, atomic design elements.

**Example: Button**

```tsx
// components/ui/Button.tsx
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded font-semibold transition-colors",
        // Variants
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" &&
          "bg-gray-200 text-gray-900 hover:bg-gray-300",
        variant === "outline" &&
          "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
        // Sizes
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-base",
        size === "lg" && "px-6 py-3 text-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Layout Components (`components/layout/`)

Structural components used across pages.

**Example: Header**

```tsx
// components/layout/Header.tsx
import { Logo } from "@/components/shared/Logo";
import { Navbar } from "./Navbar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
}
```

### Section Components (`app/(landing)/_sections/`)

Page-specific sections for landing page.

**Example: Hero Section**

```tsx
// app/(landing)/_sections/Hero.tsx
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mb-4 text-5xl font-bold">Welcome to SRP</h1>
            <p className="mb-8 text-xl text-blue-100">
              Building the future of [your industry]
            </p>
            <div className="flex gap-4">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/images/hero/main.png"
              alt="Hero illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

### Data Files (`data/`)

Static content that's easy to update.

**Example: Team Data**

```typescript
// data/team.ts
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    role: "CEO & Founder",
    bio: "Passionate about building innovative solutions.",
    image: "/images/team/john-doe.jpg",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  // Add more team members here
];
```

---

## Git Workflow

### Branch Naming

```bash
# Features
feature/hero-section
feature/contact-form
feature/team-page

# Fixes
fix/mobile-menu-overflow
fix/header-z-index

# Improvements
improve/button-accessibility
improve/image-optimization

# Documentation
docs/update-readme
docs/add-contributing-guide
```

### Commit Messages

Follow conventional commits:

```
feat: add hero section to landing page
fix: resolve mobile menu overflow issue
style: update button hover states
docs: add component documentation
refactor: simplify header navigation logic
chore: update dependencies
```

### Pull Request Process

1. **Create feature branch** from `develop`
2. **Make changes** following coding standards
3. **Run pre-commit checks**: `npm run pre-commit`
4. **Commit changes** with descriptive messages
5. **Push branch** and create PR to `develop`
6. **Request review** from team lead
7. **Address feedback** and update PR
8. **Merge** after approval

---

## Pre-commit Requirements

### ⚠️ MANDATORY: Before Every Commit

Run the comprehensive pre-commit script:

```bash
npm run pre-commit
```

This script performs:

1. **Dependencies** - Fresh install (`npm ci`)
2. **Security Audit** - Vulnerability check
3. **Linting** - Code quality (ESLint)
4. **Formatting** - Code style (Prettier)
5. **Type Checking** - TypeScript validation
6. **Tests** - Test suite (when available)
7. **Build** - Production build verification

### Husky Pre-commit Hooks

Git hooks run automatically on commit:

1. Linting
2. Formatting validation
3. Type checking
4. Security audit

### Fixing Issues

```bash
# Auto-fix linting issues
npm run lint:fix

# Auto-format code
npm run format

# Check types (no auto-fix)
npm run type-check

# Run all checks manually
npm run lint && npm run format:check && npm run type-check
```

---

## Quick Start for New Developers

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd srp-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make changes** following this guide

6. **Run pre-commit checks**

   ```bash
   npm run pre-commit
   ```

7. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

---

## Common Tasks

### Adding a New Section to Landing Page

1. Create section component in `src/app/(landing)/_sections/YourSection.tsx`
2. Import and add to `src/app/(landing)/page.tsx`
3. Add any data to `src/data/` if needed
4. Follow component guidelines above

### Creating a New Page

1. Create folder in `src/app/your-page/`
2. Add `page.tsx` file
3. Optionally add `layout.tsx` for page-specific layout
4. Page will be automatically routed to `/your-page`

### Adding a Reusable Component

1. Determine category: `ui/`, `layout/`, `forms/`, or `shared/`
2. Create component file in appropriate folder
3. Export as named export
4. Document props with TypeScript interface
5. Add to component library

---

## Support

- **Questions?** Ask in team Slack channel
- **Bugs?** Create an issue on GitHub
- **Improvements?** Submit a PR with your suggestions

---

**Last Updated:** 2026-01-02
**Node Version:** v22.21.1
**Next.js:** 15
