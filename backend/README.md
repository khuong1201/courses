# LMS Backend

This is the robust, production-ready backend built for the Learning Management System (LMS) using **NestJS**, **PostgreSQL**, and **Prisma ORM**.

## Installation & Running

### Prerequisites
- Docker & Docker Compose
- Node.js (v18+)
- npm

### 🐳 Running with Docker (Recommended for Production or Quick Start)
1. Clone the repository:
   ```bash
   git clone https://github.com/khuong1201/courses.git
   cd courses
   ```
2. Start the services using Docker Compose:
   ```bash
   docker-compose up -d
   ```
   This command automatically builds the backend container and starts the PostgreSQL database.
3. Access the API: `http://localhost:3000/api/v1`
4. Access the Swagger Documentation: `http://localhost:3000/api/docs`

### 💻 Running Locally (Development Mode)
1. Clone the repository:
   ```bash
   git clone https://github.com/khuong1201/courses.git
   cd courses/backend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Start ONLY the database using Docker:
   ```bash
   cd ..
   docker-compose up -d db
   cd backend
   ```
4. Generate the Prisma Client and apply migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
5. Start the NestJS backend server:
   ```bash
   npm run start:dev
   ```

---

## 🏗 Core Architecture & Infrastructure
- **Framework:** NestJS (Node.js) chosen for its clean, scalable, and maintainable architecture.
- **Database Layer:** PostgreSQL managed via Prisma ORM for strong typing and ease of migrations.
- **Environment Management:** Multi-environment configuration established using `.env` files, validated comprehensively on startup with `Joi` and `@nestjs/config`.

## 🔐 Security & Authentication
- **Token Management:** Stateless JWT (JSON Web Tokens) setup for scalable authentication.
- **Password Security:** Integration with `bcrypt` for secure password hashing.
- **Guards & Roles (RBAC):** Extracted generic security checks into a reusable `@Auth()` decorator that binds `AuthGuard('jwt')` and `RolesGuard`.
- **IDOR Protection:** Implemented strict ownership verification logic across services to prevent Insecure Direct Object References (e.g., Instructors can only modify *their own* courses and modules).

## 🗄 Database Schema (Prisma)
- **`User` & `UserProfile`**: One-to-one relationship handling credentials and display information.
- **`Course`**: Managed by Instructors. Includes pricing, categories, and publication status (DRAFT/PUBLISHED).
- **`CourseModule`**: Segments within a course to group related lessons.
- **`Lesson`**: Supports multiple types (`VIDEO`, `TEXT`, `QUIZ`).
- **`Enrollment`**: Tracks a student's subscription to a course.
- **`LessonProgress`**: Fine-grained tracking of a student's completion status per lesson within an enrollment.

## 📡 REST API Ecosystem (Swagger Integrated)
The application endpoints are fully documented and accessible via the Swagger UI (`/api/docs`).
All endpoints use global validation (`ValidationPipe`) enforcing rigorous strict validation via DTOs.

### Implemented Modules:
* **Authentication Module (`/api/v1/auth`)**: Login & Register.
* **Courses Module (`/api/v1/courses`)**: CRUD for courses, instructor ownership, publishing.
* **Curriculum Modules (`/api/v1/curriculum/courses/:courseId/modules`)**: Create, update, delete course modules.
* **Curriculum Lessons (`/api/v1/curriculum/modules/:moduleId/lessons`)**: Add learning materials to modules.
* **Enrollments Module (`/api/v1/enrollments`)**: Enroll students, get learning lists.
* **Lesson Progress Module (`/api/v1/enrollments/:enrollmentId/lessons/:lessonId/complete`)**: Mark tracking materials as completed.

## 🛠 Engineering Best Practices Applied
- **Single Responsibility Principle (SRP):** Split overlapping domains into completely isolated Controllers and Services.
- **Don't Repeat Yourself (DRY):** Consolidated repetitive Swagger/Security decorators into tailored custom decorators (`@Auth()`).
- **Data Transfer Objects (DTO):** Enforced rigid boundaries for ingress parameters using classes mapped to Swagger Definitions (`@ApiProperty`).
