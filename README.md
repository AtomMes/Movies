# Movies Website

A full-stack application for browsing movies, searching, and adding personal notes. Built with React, Node.js, and MongoDB.

## 🚀 Setup

### Prerequisites

- MongoDB Atlas account
- TMDB API key

### Installation

1. **Backend Setup**

   ```bash
   cd server
   npm install
   cp .env.example .env
   ```

   Fill in `.env` with your credentials:

   ```
   MONGO_URI=<your-mongodb-uri>
   TMDB_API_KEY=<your-tmdb-key>
   JWT_SECRET=<your-jwt-secret>
   ```

2. **Frontend Setup**

   ```bash
   cd client
   npm install
   cp .env.example .env
   ```

   Set your backend URL:

   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```

3. **Run Development Servers**
   ```bash
   # In separate terminals:
   cd server && npm run dev
   cd client && npm run dev
   ```

## ✨ Features

### Core Functionality

- User authentication (login/registration)
- Browse trending movies (powered by TMDB)
- Search movies
- Add personal notes to movies
- View detailed movie information

### Technical Decisions

- **Frontend**

  - TanStack Query for server state management
  - ShadCN UI + TailwindCSS for modern styling
  - Layered Feature-Based Architecture
  - React Router for navigation

- **Backend**
  - JWT authentication
  - Joi request validation
  - Axios for TMDB API requests
  - Bcrypt password hashing

## Future Improvements

### Frontend

- Toast notifications
- Optimistic UI updates
- Loading states with skeletons
- Zod integration for type-safety
- Tailwind configuration standardization
- "My Notes" dedicated page

### Backend

- Comprehensive request logging

### Infrastructure

- Husky pre-commit hooks
- ESLint configuration improvements
- Environment variable validation
