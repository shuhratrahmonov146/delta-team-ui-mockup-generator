# Release v1.0.0

**Date:** 2026-02-02
**Type:** Initial Release

## Summary

Initial launch of the official corporate website. This release establishes the company's digital presence, providing comprehensive information about services, legal compliance (GDPR), and direct integration for communication and scheduling.

## Features Added

- **Site Structure & Content:**
  - **Home:** Landing page showcasing business automation solutions, global client trust, and customer testimonials.
  - **About:** Company history, mission, and team overview.
  - **Services:** Detailed catalog of offered services.
  - **Case Studies:** A dedicated portfolio section showcasing successful projects (e.g., Agri-Tech, Inventory Management) with detailed insights.
  - **Contact:** Interactive contact form and location map.
  - **Legal:** Dedicated Privacy Policy and GDPR Policy pages ensuring regulatory compliance.
  - **Booking:** Automated meeting scheduling system.
- **Integrations:**
  - **Email System:** Contact form is fully integrated with the corporate email server for direct inquiries.
  - **Google Calendar:** Booking page features real-time synchronization with the CTO's calendar to prevent scheduling conflicts.
- **UI/UX:**
  - **Sticky Header:** implemented a persistent navigation bar across all pages to ensure menu accessibility at any scroll position.
  - **Responsive Design:** Fully fluid layout adapted for Desktop, Tablet, and Mobile viewports.
  - **Mobile Navigation:** Optimized hamburger menu for mobile devices.

## Bugs Fixed

- N/A (First official release).

## Concessions

- None.

## Testing Done

**Frontend & Cross-Browser:**

- Verified compatibility on Chrome, Firefox, and Edge.
- Validated responsive behavior on physical devices ( Android via Chrome and Samsung browser) and desktop resolutions.
- Tested "Sticky Header" behavior during scrolling on all pages.

**Manual testing:**

- **Contact Form:** Validated successful email delivery from the website to the corporate inbox.
- **Booking System:** Confirmed that booked slots correctly appear in the Google Calendar and block off time.

# Release v1.1.0

**Date:** 2026-02-13
**Type:** Minor Release (Features, Improvements & Fixes)

## Summary

This release introduces a new service page, improves navigation and layout consistency, enhances the Case Studies experience, and adds analytics tracking. The update focuses on UI polish, usability, and structural improvements across multiple pages.

## Features Added

- **New Page:**
  - Added **Foundation Sprint** service page.
  - Added **Header dropdown navigation** to access the Foundation Sprint page.

- **Analytics:**
  - Integrated **Google Analytics** for traffic tracking and performance insights.

- **Case Studies:**
  - Implemented **pagination** for Study Cards to improve content navigation.

## Improvements

### Global Layout

- Increased root layout container width for better large-screen experience.
- Footer fully refactored for improved structure and maintainability.
- Updated Footer logo and added copyright section.

### Home Page

- Fixed Hero background video behavior.
- Adjusted video positioning between **768px–1150px** to appear below the Navbar.
- Added **“Case Studies”** CTA button to Testimonials section.
- Improved FAQ section:
  - Fixed hover color.
  - Centered slider/navigation dots.

### Case Studies Page

- Updated Run3D project image.
- Removed empty categories.
- Added background overlay to Study Cards.

### Contact Page

- Added **100+ country phone codes** to the contact form.
- Updated Office Cards design.

### Booking Page

- Fixed background color.
- Wrapped layout with global Container.
- Adjusted Google Calendar embed height.

### Legal Pages

- **Privacy Policy**
  - Wrapped content with Container.
  - Numbered sections for better readability.

- **GDPR Page**
  - Wrapped content with Container.
  - Updated and improved content.

## Bugs Fixed

- Hero video positioning issues across mobile screen sizes.
- Minor layout and spacing inconsistencies across multiple pages.

## Concessions

- None.

## Testing Done

**Frontend & Cross-Browser**

- Regression testing on Chrome, Firefox, and Edge.
- Verified responsive behavior after layout and footer refactor.

**Manual Testing**

- Verified Google Analytics integration.
- Tested Case Studies pagination.
- Tested contact form phone code selector.
- Verified Google Calendar embed behavior.

# Release v1.1.1

**Date:** 2026-02-17
**Type:** Minor Release

## Features Added

- Static sitemap added

# Release v1.2.0

**Date:** 2026-02-20
**Type:** Minor Release (Features, Improvements & Fixes)

## Summary

This release focuses on improving content organization, fixing critical UI bugs, and enhancing user experience across multiple pages. Key updates include restructuring the offers section into dedicated pages, fixing analytics tracking, updating office imagery, and resolving mobile navigation issues.

## Features Added

- **Offers Page Restructure:**
  - Split single offer page into **2 separate dedicated offer pages** for better content organization and user experience.
  - Improved navigation and discoverability of individual offers.

## Improvements

### About Us Page

- **Core Values Section:**
  - Updated and refined content for Core Values cards.
  - Improved clarity and messaging consistency.

- **Office Gallery:**
  - Replaced Tajikistan office image with updated photography.

## Bugs Fixed

- **Google Analytics:**
  - Fixed tracking integration error that prevented proper analytics data collection.

- **Mobile Menu:**
  - Resolved critical issue: **Background click not working after scroll**.
  - Mobile menu overlay now properly captures clicks and closes menu regardless of scroll position.

## Concessions

- None.

## Testing Done

**Frontend & Cross-Browser:**

- Regression testing on Chrome, Firefox, and Edge.
- Verified mobile menu behavior across different scroll positions on mobile devices.
- Tested analytics tracking implementation.

**Manual Testing:**

- Verified both new offer pages display correctly and are accessible via navigation.
- Tested mobile menu background click functionality at various scroll depths.
- Confirmed Core Values content updates display properly.
- Validated Tajikistan office image replacement.

# Release v1.2.1

**Date:** 2026-02-23
**Type:** PATCH

## Bugs Fixed

- `integration-sprint` Incorrect words on the page have been corrected.
- `product-foundation` Incorrect words on the page have been corrected.

# Release v1.3.0

**Date:** 2026-02-27
**Type:** Minor Release (Features, Improvements & SEO)

## Summary

This release enhances user interaction, improves visual consistency, and implements comprehensive SEO optimizations across the website. Key updates include making trusted business logos interactive, refining layout spacing, content improvements, and implementing essential SEO infrastructure for better search engine visibility.

## Features Added

- **Analytics:**
  - Integrated **Google Tag Manager** for enhanced tracking and tag management capabilities.

- **SEO Infrastructure:**
  - Added **robots.txt** file for proper search engine crawler guidance.
  - Implemented **JSON-LD structured data** for enhanced search result presentation.
  - Added **canonical tags** across pages to prevent duplicate content issues.
  - Implemented **meta descriptions** for improved search engine snippets.
  - Added comprehensive **meta tags** for better social media sharing and SEO.

- **Content Structure:**
  - Added missing **H1 and H2 heading tags** across multiple pages for improved semantic structure and accessibility.

## Improvements

### Home Page

- **Trusted Businesses Section:**
  - Made business logos **clickable** with links to their respective websites.
  - Added **hover effect** to logo icons for better user feedback and interactivity.
  - Implemented **responsive sizing** for logo icons on mobile screens (previously fixed-size).

- **FAQ Section:**
  - Removed **"Who will own the system?"** question for content streamlining.

### Global Components

- **Header:**
  - Reduced component padding for more compact and efficient use of space.

- **Footer:**
  - Reduced padding for cleaner layout.
  - Added visual **divider** between copyright and link sections.
  - Reduced spacing between copyright and footer links for tighter design.

## Bugs Fixed

- None.

## Concessions

- None.

## Testing Done

**Frontend & Cross-Browser:**

- Regression testing on Chrome, Firefox, and Edge.
- Verified hover and click behavior on trusted business logos.
- Validated responsive behavior with updated padding across Header and Footer.

**SEO Validation:**

- Validated robots.txt file accessibility and syntax.
- Tested JSON-LD structured data using Google's Rich Results Test.
- Verified canonical tags implementation across all pages.
- Confirmed meta descriptions and meta tags render correctly in page source.
- Validated heading hierarchy (H1, H2) for accessibility and SEO compliance.

**Manual Testing:**

- Tested clickable business logo links to ensure correct external navigation.
- Verified Google Tag Manager integration and tag firing.
- Confirmed visual improvements to Header and Footer spacing.
- Validated FAQ section content update.

# Release v1.3.1

**Date:** 2026-03-05
**Type:** PATCH

## Features Added

- **Navigation:**
  - Added **Careers** link to site navigation.

- **Partners:**
- Added **Benevia** partner to Partners section.

## Improvements

### Contact Page

- **Contact Form:**
  - Reduced success modal visibility duration from **2 seconds to 0.5 seconds** for improved user experience and faster form reset.

## Bugs Fixed

- None.

## Concessions

- None.

## Testing Done

**Frontend & Cross-Browser:**

- Regression testing on Chrome, Firefox, and Edge.
- Verified Careers link accessibility and navigation behavior.

**Manual Testing:**

- Tested contact form submission and confirmed new 0.5-second modal timing.
- Verified Careers link appears correctly in navigation across all pages and viewports.
