# 🗂️ Task Manager — Full Stack Technical Challenge

This project was developed as part of a **Full Stack Technical Test / Challenge**.

> **Live Demo (Frontend):**  
> 👉 https://task-manager-frontend-wvxv.onrender.com/  
>  
> **Backend API:**  
> 👉 https://task-manager-backend-85lz.onrender.com/

> The frontend, backend and database are all hosted on **Render**.

---

## 🧪 Challenge Description

**Project Title:** Simple SaaS-style Task Manager  

The goal of this challenge was to build a minimal, full-stack Task Manager web app following clean architectural principles and SaaS patterns.

### Core Requirements

#### Frontend
- React with TypeScript (Next.js optional)
- Authentication (Sign up & Login)
- Task list retrieved dynamically from backend:
  - Pagination
  - Filtering (by status and keyword)
  - Sorting (by creation date and completion status)
- Task CRUD:
  - Create, view, edit, complete and delete tasks
- Responsive UI and user feedback

#### Backend
- Node.js with NestJS
- Prisma ORM
- PostgreSQL
- JWT authentication
- Full Task CRUD API
- DTO validation and proper error handling

---

## 🚀 Tech Stack

### Frontend
- **Next.js 16 (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** for global state
- **Axios** for API communication
- **JWT authentication**

### Backend
- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **JWT authentication**

---

## 📄 Pages

| Route | Description |
|------|-------------|
| `/` | Login |
| `/register` | User registration |
| `/user` | Main dashboard |
| `/tasks` | Task management |
| `/profile` | User profile and settings |

---

## 🔐 Authentication

- The backend returns a JWT after login or registration.
- The token is currently stored in `localStorage`.
- Axios automatically attaches the token to requests via interceptors.
- If the token is missing or invalid, the user is redirected to the login page.

---
## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# production mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

