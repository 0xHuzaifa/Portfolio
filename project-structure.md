# Project Structure

This is a Next.js portfolio project built with TypeScript, Tailwind CSS, and various UI libraries like Radix UI. It features a VS Code-like interface with themes, tabs, and a sidebar navigation.

## Folder Hierarchy

```
portfolio/
├── biome.json
├── components.json
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── public/
├── src/
│   ├── global.d.ts
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── how-i-work/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── beauty-salon/
│   │   │   │   └── page.tsx
│   │   │   ├── chatapp/
│   │   │   │   └── page.tsx
│   │   │   ├── movie-search/
│   │   │   │   └── page.tsx
│   │   │   └── old-portfolio/
│   │   │       └── page.tsx
│   │   └── why-choose-me/
│   │       └── page.tsx
│   ├── assets/
│   │   ├── elegent-beauty/
│   │   └── movie-search/
│   ├── components/
│   │   ├── ClientLayout.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── sidebar/
│   │   │   ├── SidebarAvatar.tsx
│   │   │   └── SidebarSettings.tsx
│   │   ├── tabs/
│   │   │   ├── TabBar.tsx
│   │   │   └── TabItem.tsx
│   │   └── ui/
│   │       ├── avatar.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── sonner.tsx
│   │       └── tooltip.tsx
│   ├── contexts/
│   │   ├── TabContext.tsx
│   │   └── ThemeContext.tsx
│   └── lib/
│       ├── routes.ts
│       └── utils.ts
```

## Root Files

- **biome.json**: Configuration file for Biome, a fast linter and code formatter for JavaScript/TypeScript.
- **components.json**: Configuration for shadcn/ui components.
- **next-env.d.ts**: TypeScript declarations for Next.js.
- **next.config.ts**: Configuration file for Next.js.
- **package.json**: Defines project dependencies, scripts, and metadata. Includes scripts for development, building, and linting.
- **postcss.config.mjs**: Configuration for PostCSS, used with Tailwind CSS.
- **README.md**: Standard Next.js README with setup instructions.
- **tsconfig.json**: TypeScript configuration.

## public/

Directory for static assets served by Next.js (e.g., images, fonts).

## src/

- **global.d.ts**: Global TypeScript declarations.

- **app/**: Next.js App Router directory containing page components.
  - **globals.css**: Global CSS styles, including Tailwind CSS.
  - **layout.tsx**: Root layout component that sets up fonts, metadata, and wraps the app with ClientLayout.
  - **page.tsx**: Home page component displaying introduction and navigation hints.
  - **about/**: About page.
    - **page.tsx**: About me page.
  - **contact/**: Contact page.
    - **page.tsx**: Contact information page.
  - **how-i-work/**: How I work page.
    - **page.tsx**: Development process and methodology page.
  - **projects/**: Projects section.
    - **beauty-salon/**: Beauty salon project page.
      - **page.tsx**: Details about the Elegant Beauty Salon project, a salon management system with booking and scheduling.
    - **chatapp/**: Chat app project page.
      - **page.tsx**: Chat application project details.
    - **movie-search/**: Movie search project page.
      - **page.tsx**: Movie search app details.
    - **old-portfolio/**: Old portfolio project page.
      - **page.tsx**: Previous portfolio project.
  - **why-choose-me/**: Why choose me page.
    - **page.tsx**: Reasons to choose the developer.

- **assets/**: Project-specific assets.
  - **elegent-beauty/**: Assets for the beauty salon project (e.g., images).
  - **movie-search/**: Assets for the movie search project.

- **components/**: Reusable React components.
  - **ClientLayout.tsx**: Client-side layout component providing theme, tooltip, and tab contexts, and structuring the UI with header, sidebar, and main content.
  - **Header.tsx**: Header component.
  - **Sidebar.tsx**: Sidebar component for navigation.
  - **sidebar/**: Sidebar sub-components.
    - **SidebarAvatar.tsx**: Avatar component for the sidebar.
    - **SidebarSettings.tsx**: Settings component for the sidebar.
  - **tabs/**: Tab-related components.
    - **TabBar.tsx**: Tab bar component.
    - **TabItem.tsx**: Individual tab item component.
  - **ui/**: UI components, likely from shadcn/ui library.
    - **avatar.tsx**: Avatar UI component.
    - **dropdown-menu.tsx**: Dropdown menu component.
    - **sonner.tsx**: Toast notification component.
    - **tooltip.tsx**: Tooltip component.

- **contexts/**: React contexts for global state management.
  - **TabContext.tsx**: Context for managing tabs, similar to VS Code's tab system.
  - **ThemeContext.tsx**: Context for theme management, supporting multiple themes (default, ocean, sunset, forest).

- **lib/**: Utility libraries and configurations.
  - **routes.ts**: Defines routes for pages and projects used in navigation.
  - **utils.ts**: Utility functions.
