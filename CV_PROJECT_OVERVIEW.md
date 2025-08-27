
# Project Overview: Church Website & Content Management System

## 1. High-Level Summary

This is a full-stack web application built for a church organization. It serves as a central digital platform for the community, providing a public-facing website and a comprehensive admin dashboard for content management. The application is built with a modern technology stack, including Next.js, TypeScript, Prisma, and PostgreSQL, and features role-based access control, dynamic content pages, and community engagement tools.

---

## 2. Core Problem & Solution

*   **Problem**: The church required a modern, scalable, and easy-to-manage online presence to effectively communicate with its members, manage church activities (like events and sermons), publish content (blogs), and engage with the wider community.
*   **Solution**: A feature-rich, database-driven web application was developed. It provides a user-friendly public interface for visitors and a secure, role-based admin panel that allows authorized users to manage all dynamic content without needing technical expertise.

---

## 3. Key Features

### A. Content Management System (CMS) & Admin Dashboard
- **CRUD Operations**: Admins have full Create, Read, Update, and Delete capabilities for all major content types.
- **Events Management**: Create and manage church events with details like date, location, and description.
- **Sermon Hub**: Upload and manage sermons. The system can fetch video details from YouTube URLs and automatically checks for new content from the church's YouTube channel.
- **Blog Platform**: A complete blogging system with a rich text editor (`React Quill`) for creating, editing, and publishing articles.
- **Media Library**: Centralized media management for uploading and storing images and other assets using `UploadThing`.

### B. User Management & Security
- **Authentication**: Secure user authentication handled by `NextAuth.js (v5)`, supporting both credentials and OAuth providers.
- **Role-Based Access Control (RBAC)**: The system implements a clear permission structure with roles like `OWNER`, `ADMIN`, `MINISTER`, and `MEMBER`, defined in the Prisma schema.
- **Protected Routes**: Middleware ensures that only users with the appropriate roles can access the admin dashboard and sensitive API endpoints.

### C. Public-Facing Website
- **Dynamic Pages**: All content on the public site (events, sermons, blogs) is dynamically rendered from the PostgreSQL database.
- **Interactive UI**: Built with React, featuring components from `Shadcn/UI` and interactive elements like an image carousel (`Embla Carousel`).
- **Live Stream Status**: A feature to check and display if a YouTube live stream is currently active.
- **Responsive Design**: Styled with Tailwind CSS for a seamless experience across all devices.

### D. Community Engagement
- **Newsletter Subscription**: A newsletter system that captures user emails, sends automated welcome messages, and allows for bulk email campaigns using `Resend`.
- **Contact Form**: A dedicated form for visitors to send messages directly to the church administration.

---

## 4. Technology Stack

- **Framework**: **Next.js 14** (App Router)
- **Language**: **TypeScript**
- **Frontend**:
    - **UI Library**: **React.js**
    - **Styling**: **Tailwind CSS**
    - **Component Library**: **Shadcn/UI**
    - **Forms**: **React Hook Form** with **Zod** for validation
    - **Rich Text Editor**: **React Quill**
    - **Carousels**: **Embla Carousel**
- **Backend**:
    - **Runtime**: **Node.js** (via Next.js)
    - **API**: **Next.js Server Actions** and **API Routes**
- **Database & ORM**:
    - **Database**: **PostgreSQL**
    - **ORM**: **Prisma**
- **Authentication**: **NextAuth.js (v5)**
- **File Uploads**: **UploadThing**
- **Email Service**: **Resend**
- **Testing**:
    - **Framework**: **Vitest**
    - **Library**: **React Testing Library**
- **CI/CD**: **GitHub Actions** (for running tests on push/pull request)

---

## 5. Architectural Overview

- **Architecture Style**: Full-stack, monolithic application architecture using Next.js.
- **Rendering**: Primarily Server-Side Rendering (SSR) for fast load times and SEO, with client-side interactivity.
- **Data Flow**:
    1.  Client-side components trigger **Server Actions** for data mutations (e.g., creating a blog post).
    2.  Server Actions use **Prisma Client** to interact with the **PostgreSQL** database.
    3.  Page components fetch data directly on the server using Prisma within React Server Components (RSCs) or via dedicated API routes.
- **Database Schema**: The schema, defined in `prisma/schema.prisma`, models complex relationships between `User`, `Blog`, `Sermon`, `Events`, and `Media`, establishing a single source of truth for the application's data structure.
- **Security Model**: Authentication is centralized via `auth.ts`. Middleware in `src/middleware.ts` is configured to protect routes, enforcing the RBAC model by checking user session and role before granting access.
- **Code Organization**: The project follows Next.js conventions, with a clear separation of concerns:
    - `src/app/`: Routing and page components.
    - `components/`: Reusable UI components, including a distinction for admin-specific components.
    - `src/lib/`: Core application logic, including `actions.ts` (server-side mutations), `queries.ts` (database queries), `db.ts` (Prisma client), and `utils.ts`.
    - `prisma/`: Database schema and migrations.

---

## 6. My Role: Full-Stack Engineer

As the sole Full-Stack Engineer on this project, I was responsible for the end-to-end design, development, and deployment of the entire application. My contributions spanned across the full technology stack, from database design to frontend implementation.

### Key Responsibilities & Achievements:

- **System Architecture & Design**:
  - Architected the complete full-stack application using Next.js 14, ensuring a scalable and maintainable codebase.
  - Designed the PostgreSQL database schema from scratch and managed migrations using Prisma, creating a robust data model for all application features.

- **Backend Development**:
  - Engineered the entire backend logic using TypeScript, including all API Routes and Server Actions for full CRUD functionality across events, sermons, blogs, and media.
  - Implemented a secure, role-based access control (RBAC) system with NextAuth.js to protect the admin dashboard and sensitive operations.
  - Integrated essential third-party services, including **Resend** for transactional emails and newsletter delivery, and **UploadThing** for efficient media uploads and management.

- **Frontend Development**:
  - Developed the complete user interface for both the public-facing website and the administrative dashboard using React, TypeScript, and Tailwind CSS.
  - Built a comprehensive library of reusable and responsive components with Shadcn/UI, ensuring a consistent and modern user experience.
  - Implemented all frontend interactivity, including the rich text editor for blogs, the media gallery carousel, and state management for forms.

- **Testing & Quality Assurance**:
  - Established the testing environment using Vitest and React Testing Library.
  - Wrote unit and integration tests for critical components and backend functions to ensure application reliability and stability.
  - Configured the CI/CD pipeline with GitHub Actions to automate the testing process on every code push and pull request.

- **Deployment & Hosting**:
  - Deployed the full-stack application, with the frontend hosted on **Vercel** for optimal performance and the **PostgreSQL** database and backend services managed by **Supabase**.
  - Configured the domain name and DNS settings through **Cloudflare**.

- **End-to-End Ownership**:
  - Managed the project from initial concept to a fully functional, production-ready application, demonstrating strong project management and problem-solving skills.
