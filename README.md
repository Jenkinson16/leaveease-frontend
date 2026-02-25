# LeaveEase Frontend Dashboard

The React frontend for the [LeaveEase](https://github.com/Jenkinson16/leaveease-api) employee leave management system. Built on the Berry Free React Admin Template with Material UI, providing role-based dashboards for employees and administrators.

## Live URLs

| Resource | URL |
|----------|-----|
| Frontend Dashboard | [https://leaveease-frontend.vercel.app](https://leaveease-frontend.vercel.app) |
| Backend API (Swagger UI) | [https://leaveease-api.onrender.com/swagger-ui/index.html](https://leaveease-api.onrender.com/swagger-ui/index.html) |

> **Note:** The backend is deployed on Render's free tier. The first request after a period of inactivity may take 30-60 seconds while the service starts up.

## Features

- Login and registration forms with client-side validation.
- Role selection during registration (Employee or Admin).
- Employee dashboard for submitting leave requests and viewing personal leave history.
- Admin dashboard for viewing all leave requests across the organization with summary statistics.
- Admin actions to approve or reject pending leave requests.
- JWT-based authentication with automatic token management via Axios interceptors.
- Protected routes that redirect unauthenticated users to the login page.
- Responsive Material UI layout with sidebar navigation.

## Tech Stack

- React 19 with Vite 7
- Material UI (MUI) 7
- Berry Free React Admin Template
- Axios with JWT request/response interceptors
- React Router 7 with protected routes
- Yup for form validation
- Framer Motion for transitions

## Project Structure

```
frontend/vite/src/
├── api/                  # Axios instance and API configuration
├── contexts/             # AuthContext for login state management
├── hooks/                # Custom React hooks
├── layout/               # Main layout, sidebar, header components
├── menu-items/           # Sidebar navigation configuration
├── routes/               # Route definitions with auth guard
├── store/                # Redux store configuration
├── themes/               # MUI theme customization
├── ui-component/         # Reusable UI components (cards, forms)
├── utils/                # AuthGuard, utility functions
└── views/
    ├── dashboard/        # Default dashboard page
    ├── leaves/           # Leave management pages (Employee + Admin)
    ├── pages/auth-forms/ # Login and Register forms
    └── utilities/        # Utility pages
```

## How to Run Locally

### Prerequisites

- Node.js 18 or later
- npm
- The backend API running at `http://localhost:8080` (see [backend repository](https://github.com/Jenkinson16/leaveease-api))

### Setup

```bash
cd frontend/vite
npm install
npm start
```

The application starts on `http://localhost:3000` and proxies API requests to `http://localhost:8080/api`.

### Environment Variables

Create a `.env` file in `frontend/vite/` or configure these in your deployment platform:

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend API base URL (e.g. `https://leaveease-api.onrender.com/api`) |
| `VITE_APP_BASE_NAME` | Base path for the app (use `/` for root deployment) |

## Screenshots

### Login Page
![Login Page](https://raw.githubusercontent.com/Jenkinson16/leaveease-api/main/screenshots/login.png)

### Registration Page
![Registration Page](https://raw.githubusercontent.com/Jenkinson16/leaveease-api/main/screenshots/register.png)

### Employee Dashboard
![Employee Dashboard](https://raw.githubusercontent.com/Jenkinson16/leaveease-api/main/screenshots/employee-dashboard.png)

### Admin Dashboard
![Admin Dashboard](https://raw.githubusercontent.com/Jenkinson16/leaveease-api/main/screenshots/admin-dashboard.png)

## Deployment

The frontend is deployed on [Vercel](https://vercel.com) as a static site. The build command is `npm run build` from the `frontend/vite` directory.

## Related Repository

- **Backend API**: [Jenkinson16/leaveease-api](https://github.com/Jenkinson16/leaveease-api)

## License

This project is licensed under the MIT License.
