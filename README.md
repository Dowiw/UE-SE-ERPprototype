# Interactive ERP Application (Community Edition)

This is a modular, modern ERP prototype built with React and TypeScript, featuring dashboards for financial management, GDPR compliance, analytics, and more.

## Quick Start

1. **Clone the repository**
   ```sh
   git clone https://github.com/Dowiw/UE-SE-ERPprototype.git
   cd UE-SE-ERPprototype
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or as indicated in your terminal).

## Tech Stack

- Frontend: React 18, TypeScript
- Styling: Tailwind CSS, custom CSS modules
- State Management: React Context API (or Redux, if used)
- Icons: Lucide, Heroicons
- Tooling: Vite, ESLint, Prettier

## Project Structure

```
src/
  components/         # Reusable UI and dashboard components
  styles/             # Global and component styles
  guidelines/         # Project and UI guidelines
  App.tsx             # Main app entry
  main.tsx            # React root
  index.css           # Tailwind and global styles
```

## Available Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run preview` – Preview the production build
- `npm run lint` – Lint the codebase

## Contributing

1. Fork the repository and create your branch from `main`.
2. Make your changes and add tests if applicable.
3. Run `npm run lint` and ensure all checks pass.
4. Submit a pull request with a clear description of your changes.

## Guidelines

- Follow the [guidelines/Guidelines.md](src/guidelines/Guidelines.md) for UI and code conventions.
- Use the gold/black color scheme for all new UI components.
- Keep components modular and reusable.

## Support

For questions or issues, please open an issue or contact the maintainers.

---

Original design: [Figma Project](https://www.figma.com/design/ii2P87h8TIc8GTJhfGvsJc/Interactive-ERP-Application--Community-)
