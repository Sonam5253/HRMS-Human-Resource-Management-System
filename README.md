# HRMS — Human Resource Management System

This repository contains a browser-based HR management application built with React and Vite. It provides employee management, attendance tracking, payroll basics, projects, clients, and admin dashboards for small-to-medium organizations.

**Key points:**
- Modern React app (Vite + JSX)
- Tailwind CSS for styling
- Axios for API calls and a lightweight service layer
- Redux Toolkit / slices used for app state
- Prebuilt components for employees, departments, attendance, tasks, payroll, and more

**Table of contents**
- [HRMS — Human Resource Management System](#hrms--human-resource-management-system)
  - [Features](#features)
  - [Tech stack](#tech-stack)
  - [Getting started](#getting-started)
  - [Environment variables](#environment-variables)
  - [Project structure](#project-structure)
  - [Available scripts](#available-scripts)
  - [Contributing](#contributing)
  - [License \& contact](#license--contact)

## Features

- Employee registration and management
- Attendance history, calendar, and monthly summaries
- Departments, designations, and leaders views
- Client management and statistics
- Tasks, projects, and shift management
- Role-based routing and basic auth flow

## Tech stack

- React + Vite
- Tailwind CSS
- Axios
- Redux Toolkit (store + slices)
- React Router
- Optional: ESLint, Prettier (project contains config files)

## Getting started

Prerequisites: Node.js (16+) and npm or yarn.

1. Install dependencies

```bash
npm install
# or
yarn
```

2. Run the dev server

```bash
npm run dev
# or
yarn dev
```

3. Build for production

```bash
npm run build
```

4. Preview the production build

```bash
npm run preview
```

## Environment variables

Configure API endpoints and secrets via Vite env files. Example in `.env`:

```
VITE_API_BASE_URL=https://api.example.com
```

The frontend uses `src/api/axios.js` to create Axios instances; point `VITE_API_BASE_URL` to your backend.

## Project structure

Top-level `src/` highlights:

- `src/components/` — reusable UI components and feature subfolders
- `src/pages/` — route pages grouped by feature (dashboard, auth, admin, etc.)
- `src/api/` — Axios instance and API helpers
- `src/services/` — higher-level service wrappers for APIs
- `src/store/` — Redux slices and store
- `src/utils/` — helpers, export utilities, auth helpers
- `src/layouts/` — main layout and route guards

Explore these directories for feature implementations:

- [src/components](src/components)
- [src/services](src/services)
- [src/pages](src/pages)

## Available scripts

- `dev` — start Vite dev server with HMR
- `build` — build production assets
- `preview` — locally preview production build
- `lint` — run ESLint (if configured)
- `format` — run Prettier (if configured)

Run via `npm run <script>` or `yarn <script>`.

## Contributing

1. Fork the repo and create a feature branch.
2. Follow existing code style (Tailwind utility classes, components pattern).
3. Open a pull request with a clear description of changes.

If you'd like, I can add a CONTRIBUTING.md with a more detailed workflow.

## License & contact

This project does not include a license file. Add a `LICENSE` if you want an explicit license.

For questions or help, open an issue in this repository or contact the maintainer listed in project settings.

---

README generated/updated by project maintainer helper.
