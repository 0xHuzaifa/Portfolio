# Project Structure

This is a Next.js portfolio project built with TypeScript and Tailwind CSS. It features a VS Code-inspired interface, custom layout and sidebar navigation, and an App Router structure with dynamic system pages.

## Folder Hierarchy

```
portfolio/
├── .env
├── .env.example
├── .gitignore
├── biome.json
├── components.json
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── project-structure.md
├── README.md
├── tsconfig.json
├── public/
│   ├── favicon.ico
│   ├── file.svg
│   ├── full-logo-with-bg.png
│   ├── full-logo.png
│   ├── globe.svg
│   ├── huzaifa.jpg
│   ├── logo.png
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── global.d.ts
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/
│   │   │   │   └── route.ts
│   │   │   └── contact/
│   │   │       └── route.ts
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── experience/
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── how-i-build-systems/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   └── systems/
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── assets/
│   │   ├── article-platform/
│   │   ├── chat-system/
│   │   ├── crm-system/
│   │   └── inventory-system/
│   ├── components/
│   │   ├── assistant/
│   │   │   └── PortfolioChat.tsx
│   │   ├── layout/
│   │   │   ├── ActivityBar.tsx
│   │   │   ├── AssistantPanel.tsx
│   │   │   ├── EditorLayout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── WorkspaceContent.tsx
│   │   ├── navigation/
│   │   │   └── AppLink.tsx
│   │   ├── pages/
│   │   │   ├── ContactPageContent.tsx
│   │   │   ├── ExperiencePageContent.tsx
│   │   │   ├── HomePageContent.tsx
│   │   │   ├── HowIBuildSystemsPageContent.tsx
│   │   │   └── SystemPageContent.tsx
│   │   ├── portfolio/
│   │   │   ├── FeaturedSystems.tsx
│   │   │   ├── HeroEditor.tsx
│   │   │   └── TechStack.tsx
│   │   ├── sidebar/
│   │   │   ├── SidebarAvatar.tsx
│   │   │   └── SidebarSettings.tsx
│   │   ├── systems/
│   │   │   ├── ImageLightbox.tsx
│   │   │   ├── SystemArchitecture.tsx
│   │   │   ├── SystemFeatures.tsx
│   │   │   ├── SystemHeader.tsx
│   │   │   └── SystemImageGallery.tsx
│   │   ├── tabs/
│   │   │   ├── TabBar.tsx
│   │   │   └── TabItem.tsx
│   │   └── ui/
│   │       ├── avatar.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── sonner.tsx
│   │       └── tooltip.tsx
│   ├── config/
│   │   └── routes.ts
│   ├── contexts/
│   │   ├── NavigationContext.tsx
│   │   ├── TabContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   ├── experience.ts
│   │   ├── systemMap.ts
│   │   ├── systems.ts
│   │   └── techStack.ts
│   ├── emails/
│   │   ├── ContactEmailLayout.tsx
│   │   ├── ContactOwnerNotificationEmail.tsx
│   │   └── ContactUserConfirmationEmail.tsx
│   └── lib/
│       ├── ai/
│       │   ├── chat.ts
│       │   ├── chat.types.ts
│       │   ├── models.ts
│       │   ├── prompt.ts
│       │   └── retrieval.ts
│       ├── contact/
│       │   ├── contact-email.service.tsx
│       │   ├── contact.constants.ts
│       │   ├── contact.types.ts
│       │   └── contact.validation.ts
│       ├── routes.ts
│       ├── techIcons.tsx
│       └── utils.ts
```

## Root Files

- **.env**: Local environment variables.
- **.env.example**: Example environment variable file.
- **.gitignore**: Files and folders excluded from version control.
- **biome.json**: Configuration for Biome linting and formatting.
- **components.json**: Configuration for shadcn/ui components.
- **next-env.d.ts**: Next.js TypeScript declarations.
- **next.config.ts**: Next.js configuration.
- **package-lock.json**: Lockfile for npm dependencies.
- **package.json**: Project dependencies and scripts.
- **postcss.config.mjs**: Tailwind/PostCSS configuration.
- **project-structure.md**: This project structure documentation.
- **README.md**: Project overview and setup instructions.
- **tsconfig.json**: TypeScript compiler configuration.

## public/

Static assets served by Next.js.

- **favicon.ico**
- **file.svg**
- **full-logo-with-bg.png**
- **full-logo.png**
- **globe.svg**
- **huzaifa.jpg**
- **logo.png**
- **next.svg**
- **vercel.svg**
- **window.svg**

## src/

- **global.d.ts**: Global TypeScript declarations.

- **app/**: Next.js App Router pages, API routes, and root layout.
  - **api/chat/route.ts**: Chat API endpoint.
  - **api/contact/route.ts**: Contact form API endpoint.
  - **contact/page.tsx**: Contact page.
  - **experience/page.tsx**: Experience page.
  - **favicon.ico**: App icon reference.
  - **globals.css**: Global CSS styles.
  - **how-i-build-systems/page.tsx**: Process and methodology page.
  - **layout.tsx**: Root layout and app wrapper.
  - **page.tsx**: Homepage.
  - **robots.ts**: Robots.txt route.
  - **sitemap.ts**: Sitemap generation route.
  - **systems/[slug]/page.tsx**: Dynamic system detail page.

- **assets/**: Static design assets for system illustrations.
  - **article-platform/**
  - **chat-system/**
  - **crm-system/**
  - **inventory-system/**

- **components/**: Reusable UI and page components.
  - **assistant/PortfolioChat.tsx**: Chat assistant component.
  - **layout/**: Main layout building blocks.
  - **navigation/AppLink.tsx**: Navigation link component.
  - **pages/**: Page-specific UI sections.
  - **portfolio/**: Portfolio/homepage components.
  - **sidebar/**: Sidebar-related components.
  - **systems/**: System detail and gallery components.
  - **tabs/**: Tab bar components.
  - **ui/**: Shared UI primitives and utilities.

- **config/routes.ts**: Route definitions and page routing data.

- **contexts/**: React context providers.
  - **NavigationContext.tsx**
  - **TabContext.tsx**
  - **ThemeContext.tsx**

- **data/**: Static data for the portfolio and system pages.
  - **experience.ts**
  - **systemMap.ts**
  - **systems.ts**
  - **techStack.ts**

- **emails/**: Email layout and notification templates.
  - **ContactEmailLayout.tsx**
  - **ContactOwnerNotificationEmail.tsx**
  - **ContactUserConfirmationEmail.tsx**

- **lib/**: Utility functions, AI helpers, and contact services.
  - **ai/**: Chat, prompt, retrieval, and model helper utilities.
  - **contact/**: Contact email service, validation, and types.
  - **routes.ts**: Shared route helpers.
  - **techIcons.tsx**: Tech icon component helpers.
  - **utils.ts**: General utility functions.

> Hidden/generated directories like `.git/`, `.next/`, and `node_modules/` are not listed above.
