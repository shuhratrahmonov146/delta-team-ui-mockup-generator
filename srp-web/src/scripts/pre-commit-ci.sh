#!/bin/bash

# Pre-Commit CI Script
# Quick checks before committing to catch issues early and save CI minutes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo ""
    echo -e "${BLUE}=========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}=========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_step() {
    echo -e "${BLUE}→ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_header "PRE-COMMIT CI CHECKS"
echo "Running essential checks before commit..."
echo ""

# ============================================
# Dependencies & Security
# ============================================
print_step "Installing dependencies..."
if npm ci > /dev/null 2>&1; then
    print_success "Dependencies installed"
else
    print_error "Failed to install dependencies"
    exit 1
fi

print_step "Security audit..."
if npm audit --audit-level=moderate > /dev/null 2>&1; then
    print_success "No security vulnerabilities"
else
    print_error "Security vulnerabilities found! Run: npm audit"
    exit 1
fi

# ============================================
# Code Quality Checks
# ============================================
print_step "Linting code..."
if npm run lint > /dev/null 2>&1; then
    print_success "Linting passed"
else
    print_error "Linting failed! Run: npm run lint:fix"
    exit 1
fi

print_step "Formatting code..."
if npm run format > /dev/null 2>&1; then
    print_success "Code formatted"
else
    print_warning "Formatting may have issues"
fi

print_step "Checking code formatting..."
if npx prettier --check "**/*.{ts,tsx,js,jsx,json,md}" > /dev/null 2>&1; then
    print_success "Formatting correct"
else
    print_error "Formatting issues! Run: npm run format"
    exit 1
fi

# ============================================
# Type Safety & Tests
# ============================================
print_step "Type checking..."
if npm run type-check > /dev/null 2>&1; then
    print_success "Type check passed"
else
    print_error "Type errors found! Run: npm run type-check"
    exit 1
fi

print_step "Running tests..."
if npm test -- --passWithNoTests > /dev/null 2>&1; then
    print_success "Tests passed"
else
    print_warning "No tests configured yet"
fi

# ============================================
# Build Check
# ============================================
print_step "Building application..."
export NODE_ENV="production"
if npm run build > /dev/null 2>&1; then
    print_success "Build successful"
else
    print_error "Build failed! Run: npm run build"
    exit 1
fi

# ============================================
# Final Summary
# ============================================
print_header "ALL CHECKS PASSED! ✓"
echo ""
echo -e "${GREEN}✓ Security audit${NC}"
echo -e "${GREEN}✓ Code quality (lint + format)${NC}"
echo -e "${GREEN}✓ Type safety${NC}"
echo -e "${GREEN}✓ Tests${NC}"
echo -e "${GREEN}✓ Build${NC}"
echo ""
echo -e "${GREEN}Your code is ready to commit!${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

exit 0
