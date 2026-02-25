# LeaveEase - React Frontend

A responsive leave management dashboard built with React 19, Vite 7, and Material UI 7, based on the Berry Free React Admin Template. Connects to the LeaveEase Spring Boot backend for JWT authentication and role-based leave management.

## Features

- JWT-based login and registration with role selection (Employee / Admin)
- Employee dashboard: submit leave requests and view personal leave history
- Admin dashboard: view all leave requests with summary statistics, approve or reject pending requests
- Protected routes that redirect unauthenticated users to the login page
- Axios interceptors for automatic JWT token attachment and global 401 handling
- Responsive Material UI components with loading indicators and toast notifications

## Tech Stack

- React 19 with Vite 7
- Material UI (MUI) 7
- Berry Free React Admin Template
- Axios with JWT interceptors
- React Router 7
- jwt-decode
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- The backend API running at `http://localhost:8080` (see [leaveease-api](https://github.com/Jenkinson16/leaveease-api))

### Install and Run

```bash
npm install
npm start
```

The app starts at `http://localhost:3000`.

### Environment Variables

Configure in `.env`:

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend API base URL (default: `http://localhost:8080/api`) |
| `VITE_APP_BASE_NAME` | Base path for the app (default: `/`) |

## Related Repository

The Spring Boot backend API for this project is maintained in a separate repository:

- **Backend**: [Jenkinson16/leaveease-api](https://github.com/Jenkinson16/leaveease-api)

## License

This project is licensed under the MIT License.
