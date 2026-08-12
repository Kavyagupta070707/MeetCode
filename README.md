# MeetCode

MeetCode is a full-stack collaborative coding platform built for technical interview practice and pair programming. It combines authenticated user sessions, live coding rooms, video calls, chat, shared code editing, and code execution in one workspace so two users can solve programming problems together in real time.

The project is organized as a monorepo with a React frontend and an Express backend. The frontend handles the user interface, authentication flow, problem pages, session dashboard, Monaco code editor, video call UI, chat, and code output panel. The backend handles API routes, session persistence, user protection middleware, Socket.IO signaling, collaborative editor events, and code execution requests.

## Features

- User authentication through Clerk.
- Dashboard for active sessions and recent completed sessions.
- Create coding sessions by selecting a problem and difficulty.
- Join an available active session as a participant.
- Host-controlled session ending.
- Real-time collaborative code editing with Socket.IO.
- Language switching that syncs across participants.
- Monaco-powered code editor.
- Code execution support for JavaScript, Python, Java, and C++.
- Problem descriptions, examples, constraints, starter code, and expected output.
- WebRTC-based video calls with Socket.IO signaling.
- In-session text chat.
- Responsive React UI styled with Tailwind CSS and DaisyUI.
- MongoDB-backed session and user models through Mongoose.
- Inngest endpoint support for background workflows.
- Vercel configuration files for frontend and backend deployment.

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- TanStack React Query
- Clerk React
- Socket.IO Client
- Monaco Editor
- Tailwind CSS
- DaisyUI
- Lucide React
- React Hot Toast
- React Resizable Panels

### Backend

- Node.js
- Express 5
- MongoDB with Mongoose
- Clerk Express
- Socket.IO
- Inngest
- CORS
- Dotenv
- Nodemon

## Project Structure

```text
MeetCode/
  package.json
  package-lock.json
  README.md
  MeetCodeBackend/
    backend/
      package.json
      vercel.json
      src/
        server.js
        controllers/
          codeController.js
          sessionControllers.js
        lib/
          db.js
          env.js
          inngest.js
          socket.js
        middleware/
          protectRoute.js
        models/
          Session.js
          User.js
        routes/
          codeRoutes.js
          sessionRoutes.js
  MeetCodeFrontend/
    frontend/
      package.json
      vite.config.js
      vercel.json
      index.html
      public/
        hero.png
      src/
        App.jsx
        main.jsx
        api/
          sessions.js
        components/
        data/
          problems.js
        hooks/
        lib/
        pages/
```

## Main Application Flow

1. A visitor opens the landing page.
2. The visitor signs in using Clerk.
3. After authentication, the user is redirected to the dashboard.
4. From the dashboard, a user can create a new coding session or join an existing active session.
5. A session contains the selected problem, difficulty, host, optional participant, status, and call ID.
6. Once inside a session, both users can:
   - Read the problem statement.
   - Edit code in the shared editor.
   - Switch programming languages.
   - Run code and inspect output.
   - Use video, audio, and chat.
7. The host can end the session, which marks it as completed and moves it into recent sessions.

## Frontend Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Public landing page | Public |
| `/about` | About page | Public |
| `/dashboard` | User dashboard with active and recent sessions | Signed-in users |
| `/problems` | Problem list page | Signed-in users |
| `/problem/:id` | Individual problem page | Signed-in users |
| `/session/:id` | Live coding session room | Signed-in users |

Protected frontend routes check Clerk authentication state before rendering. If a user is not signed in, they are redirected back to the landing page.

## Backend API Routes

### Session Routes

Base path: `/api/sessions`

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/sessions` | Create a new active coding session |
| `GET` | `/api/sessions/active` | Get active sessions |
| `GET` | `/api/sessions/past-sessions` | Get completed sessions for the current user |
| `GET` | `/api/sessions/:id` | Get a single session by ID |
| `POST` | `/api/sessions/:id/join` | Join an active session as the participant |
| `POST` | `/api/sessions/:id/end` | End a session as the host |

Most session routes are protected by authentication middleware.

### Code Execution Route

Base path: `/api/code`

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/code/execute` | Run submitted source code for a supported language |

The code execution controller maps app language names to compiler identifiers and forwards execution requests to the configured online compiler service.

### Other Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/hello` | Simple health check response |
| `ALL` | `/api/inngest` | Inngest function endpoint |

## Real-Time Features

MeetCode uses Socket.IO for two separate real-time flows.

### Collaboration Events

The collaborative editor joins users into a code room using the session call ID. Code changes and language changes are broadcast to the other participant so both users stay in sync while solving a problem.

Important events include:

- `join-code-room`
- `code-change`
- `language-change`

### Video, Audio, and Chat Events

The video call uses WebRTC for media transport and Socket.IO for signaling. Users join a room, exchange offers and answers, pass ICE candidates, and receive user join/leave updates.

Important events include:

- `join-room`
- `room-users`
- `user-joined`
- `user-left`
- `offer`
- `answer`
- `ice-candidate`
- `chat-message`

The app currently uses Google's public STUN server for peer connection setup.

## Data Models

### User

The user model stores the authenticated user's profile information and Clerk identifier.

Main fields:

- `name`
- `email`
- `profileimage`
- `clerkId`
- timestamps

### Session

The session model stores interview room information.

Main fields:

- `problemTitle`
- `difficulty`
- `host`
- `participant`
- `status`
- `callId`
- timestamps

Session difficulty can be `easy`, `medium`, or `hard`. Session status can be `active` or `completed`.

## Supported Coding Languages

MeetCode includes starter code and execution support for:

- JavaScript
- Python
- Java
- C++

Problems and starter code live in:

```text
MeetCodeFrontend/frontend/src/data/problems.js
```

To add a new problem, add a new entry to the `PROBLEMS` object with:

- `id`
- `title`
- `difficulty`
- `category`
- `description`
- `examples`
- `constraints`
- `starterCode`
- `expectedOutput`

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- MongoDB database access
- Clerk application setup
- Online compiler service access

### Install Dependencies

From the project root:

```bash
npm install
npm install --prefix MeetCodeBackend/backend
npm install --prefix MeetCodeFrontend/frontend
```

The root `build` script also installs backend and frontend dependencies automatically before building the frontend.

## Running Locally

Start the backend:

```bash
npm run dev:backend
```

Start the frontend in another terminal:

```bash
npm run dev:frontend
```

By default, the backend runs through `MeetCodeBackend/backend/src/server.js`, and the frontend runs through Vite from `MeetCodeFrontend/frontend`.

## Available Scripts

### Root Scripts

| Script | Description |
| --- | --- |
| `npm run build` | Install backend and frontend dependencies, then build the frontend |
| `npm run start` | Start the backend server |
| `npm run dev:backend` | Start the backend with Nodemon |
| `npm run dev:frontend` | Start the frontend with Vite |

### Backend Scripts

Run from `MeetCodeBackend/backend`:

| Script | Description |
| --- | --- |
| `npm run dev` | Start the backend with Nodemon |
| `npm run start` | Start the backend with Node |

### Frontend Scripts

Run from `MeetCodeFrontend/frontend`:

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the frontend for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Building for Production

From the root:

```bash
npm run build
```

This installs dependencies for both apps and creates the frontend production build.

## Deployment Notes

The repository includes Vercel configuration files for both sides of the app:

- `MeetCodeFrontend/frontend/vercel.json`
- `MeetCodeBackend/backend/vercel.json`

The backend exports the Express server for serverless deployment while still supporting local development with `server.listen` when not running on Vercel.

## Development Notes

- Keep reusable frontend API calls in `src/api`.
- Keep shared frontend helpers in `src/lib`.
- Keep session-related React Query hooks in `src/hooks/useSessions.js`.
- Keep WebRTC logic isolated in `src/hooks/useWebRTCCall.js`.
- Keep collaborative editor socket logic isolated in `src/hooks/useCollaborativeCode.js`.
- Add backend routes under `src/routes`, then connect them in `src/server.js`.
- Put business logic in backend controllers instead of route files.
- Use Mongoose models for database entities.

## Troubleshooting

### Frontend cannot reach backend

Confirm that both dev servers are running and that the frontend is configured to point to the backend API URL used in your local setup.

### Video call does not start

Check browser permissions for camera and microphone. WebRTC also requires a secure context in many production scenarios.

### Code execution fails

Confirm the backend can reach the online compiler service and that the requested language is one of the supported language keys: `javascript`, `python`, `java`, or `cpp`.

### Session does not appear in recent sessions

Only completed sessions associated with the current user are returned by the recent sessions endpoint. The host must end the session for it to move from active to completed.

