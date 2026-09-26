# Help Desk Support

A responsive React help desk app for creating and managing support tickets. It is a practice project: authentication and ticket data are stored in the current browser, with no backend service required.

## Features

- Sign up and sign in with name, email, and password
- Protected dashboard and ticket pages, with sign out
- Dashboard totals and ticket status summaries
- Create tickets with a title, description, and priority
- View all tickets or filter lists by ticket status
- Search tickets by title, description, and assignee
- Assign tickets to seeded employees and support staff
- Change ticket status and delete tickets from the Closed Tickets view
- Persist ticket data and demo accounts in browser `localStorage`
- Responsive layouts for desktop and mobile

## Technology

- React 19 and Vite
- React Router
- Redux Toolkit and React Redux
- Tailwind CSS, daisyUI
- Web Crypto API for hashing practice-account passwords in the browser

## Requirements

- Node.js compatible with the installed Vite version
- npm

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the local URL printed by Vite, typically `http://localhost:5173`.

Useful scripts:

```bash
npm run lint
npm run build
npm run preview
```

## Using the app

1. Create an account on the sign-up page with your name, email, and a password of at least 8 characters.
2. Sign in with that email and password.
3. Use the dashboard navigation to view statistics, create tickets, and manage ticket lists.
4. Open a ticket list to search tickets, assign a seeded team member, or change its status.
5. Closed tickets can be permanently deleted from the Closed Tickets page after confirming the action.
6. Sign out from the account menu in the header.

### Seeded assignment team

- Rahul Patel — support
- Neha Sharma — support
- Amit Shah — employee
- Priya Shah — employee

## Data and authentication notes

- New accounts are saved in this browser only. Passwords are PBKDF2-hashed with a per-account random salt before storage.
- Ticket data is saved in `localStorage` by Redux middleware.
- Clearing browser storage removes the local accounts, session, and tickets.
- Browser-local authentication is for practice and demonstration only. It does not provide server-side identity verification, authorization, or secure multi-user data storage; do not use it for real accounts or sensitive information.
- The project currently uses mock/local data rather than a REST API.

## Project structure

```text
src/
├── auth/                 # Browser-local auth state and helpers
├── components/           # Shared UI components
├── constants/            # App text and seeded employee data
├── layout/               # Main application shell
├── pages/                # Login, signup, dashboard, and ticket pages
└── redux/                # Redux store, ticket state, persistence middleware
```
