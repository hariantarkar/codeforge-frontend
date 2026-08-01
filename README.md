# CodeForge — Frontend

The React frontend for CodeForge, a cloud-based Java online IDE. Built with React, Vite, and Monaco Editor, it provides authentication, project/file management, and a live code editor with real-time execution against the CodeForge backend.

**Live App:** _add your Vercel URL here once deployed_
**Backend Repo:** https://github.com/hariantarkar/codeforge-backend
**Live Backend:** https://codeforge-backend-ywba.onrender.com

> Note: the backend runs on a free-tier instance and spins down after inactivity. The first request after idle time may take 30–50 seconds to respond.

---

## Features

- Landing page with an interactive compile-and-run demo
- Email-based authentication (JWT), with light/dark theme toggle
- Project dashboard — create, rename, delete projects
- File management within each project — create, rename, delete, save
- Full code editor (Monaco) with Java syntax highlighting
- Real Java code execution with console output, compiler errors, and runtime exceptions
- Optional stdin input for `Scanner`-based programs
- Responsive layout, including a mobile-friendly slide-in file drawer in the editor
- Profile page with account details and email update

---

## Tech Stack

- React 18 + Vite
- React Router
- Axios (with request/response interceptors for JWT + normalized error handling)
- Monaco Editor (`@monaco-editor/react`)
- Plain component-scoped CSS with a shared design token system (no CSS framework)

---

## Architecture

```
src/
├── api/            → shared axios instance (JWT injection, error normalization)
├── services/        → one file per backend resource (Auth, Project, File, Execution, User)
├── context/          → AuthContext, ThemeContext, ToastContext
├── routes/            → ProtectedRoute (redirects unauthenticated users)
├── pages/              → one folder per route, each with its own .jsx + .css
├── components/          → reusable UI pieces, grouped by feature (layout, projects, files, editor, common)
```

Every visual component has a matching same-named CSS file sitting next to it — no CSS-in-JS, no shared monolithic stylesheet, no utility-class framework. All colors, spacing, and typography are driven by CSS variables defined once in `index.css`, which is also what makes the light/dark theme toggle work without touching individual component styles.

---

## Getting Started (Local Setup)

### Prerequisites
- Node.js 18+
- The CodeForge backend running locally or accessible remotely

### Steps

1. Clone the repository:
```bash
git clone https://github.com/hariantarkar/codeforge-frontend.git
cd codeforge-frontend
npm install
```

2. Create a `.env` file at the project root:
```
VITE_API_BASE_URL=http://localhost:8080
```
(Point this at the live backend URL instead if you don't want to run the backend locally.)

3. Run the dev server:
```bash
npm run dev
```

4. Open the app at the local URL Vite prints (typically `http://localhost:5173`).

---

## Authentication Flow

- Login is email-based (not username-based), since usernames are allowed to be non-unique in this project.
- On successful login, the JWT, username, and role are stored via `AuthContext`, which persists them to `localStorage` so a page refresh doesn't log the user out.
- `ProtectedRoute` guards `/dashboard`, `/editor/:projectId`, and `/profile` — unauthenticated users are redirected to `/login`.
- The shared axios instance automatically attaches the JWT to every outgoing request and normalizes backend error responses so components can always do `catch (err) { err.message }`.

---

## Code Execution Flow (Editor)

1. User writes code in the Monaco editor and clicks **Run**.
2. If there are unsaved changes, the file is saved first automatically.
3. The current file's ID is sent to the backend's execution endpoint, along with any optional stdin input provided via the "Program input" panel.
4. The backend compiles and runs the code in a sandboxed process with a timeout, and returns stdout, stderr, exit code, and timing information.
5. The console panel displays the result — compiler errors, runtime exceptions, or program output — matching what `javac`/`java` would actually produce.

Input must be provided upfront before clicking Run, since execution is currently request/response rather than a persistent connection. True interactive stdin/stdout would require moving to WebSockets — noted as a Phase 2 item.

---

## Known Limitations / Roadmap

- Input for running programs must be provided in advance, not typed live during execution.
- No real-time collaboration or live cursor sharing.
- No syntax/version support for languages other than Java.
- Planned: WebSocket-based streaming console output, project sharing via public links, and an admin panel for user/platform management.

---

## Author

**Harishchandra Shahadeo Antarkar**
GitHub: [github.com/hariantarkar](https://github.com/hariantarkar)
