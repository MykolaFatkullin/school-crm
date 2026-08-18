# Project Context

# Overview

School CRM is a production-oriented web application for educational institutions.

The project emphasizes maintainability, scalability and clean architecture over rapid development.

---

# Technology Stack

## Frontend

- React 19
- TypeScript
- Vite
- React Router
- React Hook Form
- SCSS Modules

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL
- Flyway
- Docker

---

# Frontend Architecture

The frontend follows a modular architecture.

```
src/
├── app/
├── assets/
├── pages/
└── shared/
```

## app

Contains application bootstrap and configuration.

Examples:

- App
- Layouts
- Routing
- Global styles

---

## assets

Contains static resources.

Examples:

- Fonts
- Icons
- Images

---

## pages

Contains route pages.

Each page owns its own:

- Components
- Styles
- Types
- Hooks
- Validation

Page-specific components should remain inside the page folder.

Example:

```
pages/
    registrationPage/
        components/
        RegistrationPage.tsx
        RegistrationPage.module.scss
```

---

## shared

Contains reusable components and utilities.

Examples:

- Button
- Input
- Modal
- Select
- Checkbox
- Hooks
- Utils
- Shared styles

Only reusable code belongs here.

---

# Backend Architecture

The backend follows a layered architecture inspired by Clean Architecture.

```
application/
common/
domain/
infrastructure/
web/
```

## application

Contains application services, use cases and mappers.

Coordinates business operations.

---

## domain

Contains business rules.

Includes:

- Domain models
- Enums
- Validators
- Security abstractions

Business logic belongs here whenever possible.

---

## infrastructure

Contains technical implementations.

Examples:

- Persistence
- Spring Security implementation
- Configuration
- External integrations

---

## web

Contains REST API.

Responsibilities:

- Controllers
- Request DTOs
- Response DTOs

Controllers should remain thin.

---

## common

Contains shared infrastructure.

Examples:

- Configuration
- Exception handling
- Utilities

Avoid placing business logic here.

---

# Dependency Rules

The project generally follows a layered architecture with the following preferred dependency direction:

web
    ↓
application
    ↓
domain

infrastructure
    ↓
application
    ↓
domain

The domain layer should remain independent from technical frameworks and infrastructure concerns.

These rules describe the preferred architectural direction, not an automatic violation for every dependency that crosses a layer boundary.

Report a layering violation only when the dependency:

- creates meaningful coupling to infrastructure or delivery mechanisms;
- places responsibilities in the wrong architectural layer;
- makes the application harder to test or evolve;
- violates an established architectural pattern used consistently across the project;
- or introduces a dependency that clearly should point in the opposite direction.

Do not report a layering violation solely because a mapper, adapter, DTO or similar technical component references another layer.

Consider the responsibility of the component and the existing project structure before reporting an architectural issue.

If the architectural intent cannot be determined from the provided code and context, do not assume that the dependency is incorrect.

---

# Business Domain

Supported user roles:

- Administrator
- Teacher
- Student
- Parent

Administrators manage:

- Users
- Students
- Teachers
- Parents
- Classes
- Subjects
- School Settings
- SMTP Settings
- Payments

Teachers manage:

- Lessons
- Attendance
- Homework
- Grades

Students can:

- View schedule
- View attendance
- Submit homework
- View grades

Parents can:

- View children's grades
- View attendance
- View homework
- Monitor academic progress

---

# API

Frontend communicates with the backend through REST APIs.

Business logic belongs to the backend.

Frontend is responsible for presentation and user interaction.

---

# Authentication

Authentication is JWT-based.

Access Tokens are short-lived.

Refresh Tokens are stored in HttpOnly cookies.

Frontend never stores Refresh Tokens.

---

# Authorization

Authorization is role-based.

Frontend may hide unavailable functionality.

Backend always validates permissions.

---

# Database

Database: PostgreSQL.

Schema changes are managed exclusively through Flyway migrations.

Never modify existing migrations.

Always create a new migration.

---

# Forms

Forms use React Hook Form.

Validation is schema-based.

Reusable inputs should integrate with React Hook Form.

---

# Routing

Routes are defined as constants.

Avoid hardcoded route strings.

---

# Components

Prefer small, focused components.

Reusable components belong in `shared`.

Page-specific components remain inside their page.

Prefer composition over inheritance.

---

# Styling

Use SCSS Modules.

Use design tokens for:

- Colors
- Typography
- Spacing
- Shadows
- Border radius

Avoid hardcoded design values whenever possible.

---

# Error Handling

Handle API failures gracefully.

Return meaningful feedback to users.

Never expose backend exception messages directly.

---

# Security

Never trust client-side data.

Never expose secrets.

Never bypass backend authorization.

Assume every client request can be manipulated.
