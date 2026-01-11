# Code and UI Guidelines

## Code Conventions

- **Language:** TypeScript (strict mode recommended)
- **Framework:** React (functional components, hooks preferred)
- **File Naming:**
  - Components: `PascalCase.tsx`
  - Utility files: `camelCase.ts`
  - Styles: `kebab-case.css` or colocated CSS modules
- **Folder Structure:**
  - Group by feature or domain when possible
  - Place reusable UI in `src/components/ui/`
- **Imports:**
  - Use absolute imports from `src/` when possible
  - Group external, then internal imports
- **Formatting:**
  - Use Prettier for code formatting
  - 2 spaces or tab width (project default)
- **Linting:**
  - Use ESLint, fix all warnings before commit
- **Comments:**
  - Use JSDoc for functions and complex logic
  - Keep comments concise and relevant
- **Testing:**
  - Add tests for utilities and critical logic (if test setup exists)

## UI Conventions

- **Color Scheme:**
  - Use the gold/black palette defined in `globals.css`
  - Avoid bright or clashing colors
- **Components:**
  - Prefer modular, reusable components
  - Use props for customization
  - Place shared UI in `src/components/ui/`
- **Accessibility:**
  - Use semantic HTML elements
  - Add `aria-label` and roles where appropriate
  - Ensure keyboard navigation works for all interactive elements
- **Responsiveness:**
  - Use responsive utility classes (Tailwind) or media queries
  - Test layouts on mobile and desktop
- **Typography:**
  - Use project font sizes and weights
  - Headings: `h1` for page titles, `h2` for sections, etc.
- **Icons:**
  - Use Lucide or Heroicons for consistency
- **Spacing:**
  - Use consistent padding/margin (Tailwind or CSS vars)
- **State Management:**
  - Use React Context or Redux for global state
  - Use local state for component-specific logic

---

For any new code or UI, follow these conventions to ensure maintainability and a consistent user experience.
