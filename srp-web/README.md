# SRP Web

Main website for SRP - currently under initial development.

## Prerequisites

- **Node.js**: v22.21.1 (or compatible version)
- **npm**: 10.x or higher

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

## Available Scripts

| Script                 | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `npm run dev`          | Start development server                                    |
| `npm run build`        | Build for production                                        |
| `npm run start`        | Start production server                                     |
| `npm run pre-commit`   | **Run all pre-commit checks (MANDATORY before committing)** |
| `npm run lint`         | Check code quality with ESLint                              |
| `npm run lint:fix`     | Auto-fix linting issues                                     |
| `npm run format`       | Format code with Prettier                                   |
| `npm run format:check` | Check code formatting                                       |
| `npm run type-check`   | Run TypeScript type checking                                |

## Code Quality & Pre-commit Checks

### ⚠️ MANDATORY: Run Before Every Commit

**You MUST run the pre-commit script before committing:**

```bash
npm run pre-commit
```

This comprehensive CI script performs all quality checks:

1. **Dependencies** - Installs fresh dependencies (`npm ci`)
2. **Security Audit** - Checks for vulnerabilities (moderate level)
3. **Linting** - ESLint code quality checks
4. **Formatting** - Auto-formats and validates code style
5. **Type Checking** - TypeScript type safety verification
6. **Tests** - Runs test suite (when available)
7. **Build** - Ensures production build succeeds

**Why it's mandatory:**

- Catches issues before they reach CI/CD
- Saves CI minutes and pipeline time
- Ensures consistent code quality
- Prevents breaking changes from being committed

### Husky Pre-commit Hooks

Husky hooks run automatically on `git commit` and perform lighter checks:

1. **Linting** - ESLint checks code quality
2. **Formatting** - Prettier validates code formatting
3. **Type Checking** - TypeScript compiler checks for type errors
4. **Security Audit** - npm audit checks for vulnerabilities

### Branch Protection

Commits to protected branches (`main`, `develop`) require confirmation. Workflow is: create new brach -> create pull request -> squash and merge if approved

### Manual Quality Checks

```bash
# Run comprehensive pre-commit checks (RECOMMENDED)
npm run pre-commit

# Or run individual checks
npm run lint && npm run format:check && npm run type-check

# Fix auto-fixable issues
npm run lint:fix
npm run format
```

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **React**: v19
- **Code Quality**:
  - ESLint 9 with Next.js config
  - Prettier 3.7
  - Husky 9.1 for Git hooks

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules (extends Next.js config)
- Format code with Prettier before committing
- Use functional components with React hooks

### Commit Messages

Follow conventional commit format:

```
feat: add new feature
fix: bug fix
docs: documentation updates
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```
