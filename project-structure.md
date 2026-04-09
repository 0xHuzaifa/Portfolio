# Project Structure

This is a Next.js portfolio project built with TypeScript, Tailwind CSS, and various UI libraries like Radix UI. It features a VS Code-like interface with themes, tabs, and sidebar navigation.

## Folder Hierarchy

```
portfolio/
├── biome.json
├── components.json
├── docs/
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── project-structure.md
├── README.md
├── tsconfig.json
├── public/
├── src/
│   ├── global.d.ts
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── experience/
│   │   │   └── page.tsx
│   │   ├── how-i-build-systems/
│   │   │   └── page.tsx
│   │   └── systems/
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── assets/
│   │   ├── article-platform/
│   │   ├── chat-system/
│   │   ├── crm-system/
│   │   └── inventory-system/
│   ├── components/
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
│   │   │   ├── SystemArchitecture.tsx
│   │   │   ├── SystemFeatures.tsx
│   │   │   └── SystemHeader.tsx
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
│   └── lib/
│       ├── routes.ts
│       └── utils.ts
```

## Root Files

- **biome.json**: Configuration file for Biome, a fast linter and code formatter for JavaScript/TypeScript.
- **components.json**: Configuration for shadcn/ui components.
- **docs/**: Directory for project documentation.
- **next-env.d.ts**: TypeScript declarations for Next.js.
- **next.config.ts**: Configuration file for Next.js.
- **package.json**: Defines project dependencies, scripts, and metadata. Includes scripts for development, building, and linting.
- **postcss.config.mjs**: Configuration for PostCSS, used with Tailwind CSS.
- **project-structure.md**: Documentation of the project structure.
- **README.md**: Standard Next.js README with setup instructions.
- **tsconfig.json**: TypeScript configuration.

## docs/

Directory for project documentation.

- **navigation-refactor-notes.md**: Notes on navigation refactoring.

## public/

Directory for static assets served by Next.js (e.g., images, fonts).

## src/

- **global.d.ts**: Global TypeScript declarations.

- **app/**: Next.js App Router directory containing page components.
  - **favicon.ico**: Favicon for the application.
  - **globals.css**: Global CSS styles, including Tailwind CSS.
  - **layout.tsx**: Root layout component that sets up fonts, metadata, and wraps the app with ClientLayout.
  - **page.tsx**: Homepage component display.
  - **contact/**: Contact page.
    - **page.tsx**: Contact information page.
  - **experience/**: Experience page.
    - **page.tsx**: Experience information page.
  - **how-i-build-systems/**: How I build systems page.
    - **page.tsx**: Process and methodology page.
  - **systems/**: System details pages.
    - **[slug]/**: Dynamic system pages.
      - **page.tsx**: System details page.

- **assets/**: Project-specific static assets.
  - **article-platform/**
  - **chat-system/**
  - **crm-system/**
  - **inventory-system/**

- **components/**: Reusable React components.
  - **layout/**: Main layout components.
  - **navigation/**: Navigation components.
  - **pages/**: Page-specific components.
  - **portfolio/**: Portfolio page components.
  - **sidebar/**: Sidebar UI components.
  - **systems/**: System feature components.
  - **tabs/**: Tab UI components.
  - **ui/**: Shared UI primitives.

- **config/**: Configuration files.
  - **routes.ts**

- **contexts/**: React context providers.
  - **NavigationContext.tsx**
  - **TabContext.tsx**
  - **ThemeContext.tsx**

- **data/**: Data files for the application.
  - **experience.ts**
  - **systemMap.ts**
  - **systems.ts**
  - **techStack.ts**

- **lib/**: Utilities and route definitions.
  - **routes.ts**
  - **utils.ts**
