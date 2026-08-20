# Project Context

## Overview

School CRM is a portfolio-oriented web application for educational institutions.

The project is intended to demonstrate production-quality engineering practices, clean architecture, maintainability, scalability, security, and thoughtful technical decisions.

However, this is not a production system with real users or an existing customer base.

The architecture should therefore remain practical and proportionate to the project.

Prioritize:

- Maintainability
- Readability
- Simplicity
- Development speed
- Clear separation of responsibilities
- Reasonable scalability
- Security
- Consistency with the existing codebase

Avoid unnecessary abstraction, overengineering, and production constraints that do not provide meaningful value in a portfolio project.

The goal is to demonstrate good engineering judgment, not to reproduce every operational constraint of a large production system.

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

src/
├── app/
├── assets/
├── pages/
└── shared/

---

## app

Contains application bootstrap and configuration.

Examples:

- App
- Layouts
- Routing
- Global styles
- Application-level providers
- Application configuration

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
- Page-specific utilities

Page-specific components should generally remain inside the page folder.

Example:

pages/
    registrationPage/
        components/
        RegistrationPage.tsx
        RegistrationPage.module.scss

Do not move page-specific code into shared merely for organizational purposes.

---

## shared

Contains genuinely reusable components and utilities.

Examples:

- Button
- Input
- Modal
- Select
- Checkbox
- Hooks
- Utils
- Shared styles

Only genuinely reusable code belongs here.

Before moving code into shared, consider whether it is actually reused or is likely to have a stable reusable responsibility.

Do not create abstractions solely to make the folder structure look cleaner.

---

# Backend Architecture

The backend follows a layered architecture inspired by Clean Architecture.

application/
common/
domain/
infrastructure/
web/

The architecture is intended to provide clear separation of responsibilities while remaining practical and maintainable.

It is not required to follow theoretical Clean Architecture rules with absolute strictness.

Prefer simple solutions that clearly communicate responsibility.

Do not introduce additional layers, interfaces, abstractions, factories, strategies, adapters, or patterns unless they provide a concrete benefit.

---

## application

Contains application services, use cases and mappers.

Coordinates business operations.

Application code may contain technical coordination required to implement application use cases.

Responsibilities may include:

- Orchestrating domain operations
- Calling repositories
- Coordinating external services
- Mapping domain/application objects
- Transaction boundaries
- Application-specific validation

Do not create additional layers between application and domain unless there is a clear reason.

---

## domain

Contains business rules and business concepts.

Includes:

- Domain models
- Enums
- Validators
- Business rules
- Security abstractions

Business logic should generally belong here when it represents domain behavior rather than technical orchestration.

The domain should remain independent from infrastructure and framework-specific implementation details where practical.

Do not force domain logic into artificial abstractions merely to satisfy theoretical architectural rules.

---

## infrastructure

Contains technical implementations.

Examples:

- Persistence
- Spring Security implementation
- Configuration
- External integrations
- Email
- File storage
- Database-related implementations

Infrastructure is responsible for technical concerns and framework-specific implementations.

---

## web

Contains the REST API.

Responsibilities:

- Controllers
- Request DTOs
- Response DTOs
- HTTP-specific validation
- HTTP-specific error handling

Controllers should generally remain thin.

Business logic should generally not be implemented directly in controllers.

Controllers should primarily:

1. Receive the request
2. Validate request-level data
3. Call the appropriate application service
4. Return the response

---

## common

Contains genuinely shared cross-cutting functionality.

Examples:

- Exception handling
- Common configuration
- Utilities
- Shared infrastructure helpers

Avoid placing business-specific logic here.

If functionality belongs clearly to a specific domain or feature, keep it there instead of moving it to common.

---

# Dependency Rules

The preferred dependency direction is:

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

The domain layer should remain independent from infrastructure and framework-specific implementation details.

These are architectural guidelines rather than absolute rules.

Not every cross-layer dependency is automatically a defect.

Technical components such as:

- Mappers
- DTO converters
- Adapters
- Persistence helpers
- Integration components

may interact with types from other technical layers when this is reasonable for their responsibility.

Evaluate dependencies based on their practical impact.

A dependency should only be considered problematic when it creates meaningful:

- Coupling
- Maintenance cost
- Testing difficulty
- Evolution difficulty
- Responsibility confusion
- Architectural inconsistency

Prefer consistency with established patterns in the existing codebase.

Do not introduce architectural changes merely to make the structure theoretically cleaner.

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

Business rules should be enforced on the backend.

---

# API

Frontend communicates with the backend through REST APIs.

Business logic belongs primarily to the backend.

Frontend is responsible for:

- Presentation
- User interaction
- Client-side validation
- UI state
- Navigation
- Displaying API results and errors

Frontend validation must never be treated as a security boundary.

The backend must validate and authorize every operation independently.

---

# Authentication

Authentication is JWT-based.

Access Tokens are short-lived.

Refresh Tokens are stored in HttpOnly cookies.

Frontend never stores Refresh Tokens in:

- localStorage
- sessionStorage
- application state
- JavaScript-accessible cookies

Authentication-related security decisions must be enforced by the backend.

---

# Authorization

Authorization is role-based.

Frontend may hide functionality unavailable to the current user.

However, frontend restrictions are only a UX feature.

Backend always validates:

- Authentication
- User identity
- Roles
- Permissions
- Resource ownership where applicable

Never rely on frontend authorization.

Never trust client-provided role or permission information.

---

# Database

Database: PostgreSQL.

Schema changes are managed through Flyway migrations.

This is a portfolio project and does not have a production database with real users or an established migration history.

Therefore:

- Existing migrations may be modified when the schema evolves.
- Migrations may be rewritten, consolidated, or replaced when doing so simplifies development.
- Creating a new migration is preferred when the change represents meaningful schema evolution, but it is not mandatory.
- There is no requirement to preserve migration history for compatibility with existing production databases.
- The database schema must remain consistent with the current application code.

If necessary, the database may be recreated from scratch during development.

Prioritize development simplicity and maintainability over preserving historical migration state.

Do not introduce migration complexity solely because it would be required in a real production environment.

---

# Forms

Forms use React Hook Form.

Validation is schema-based.

Reusable form inputs should integrate naturally with React Hook Form.

Prefer controlled abstractions only when they provide a concrete benefit.

Avoid unnecessary form wrappers or abstractions.

Validation should exist on both frontend and backend where appropriate.

Frontend validation improves UX.

Backend validation remains authoritative.

---

# Routing

Routes are defined as constants.

Avoid hardcoded route strings throughout the application.

Prefer a centralized route definition when it improves consistency.

Do not introduce a routing abstraction merely for the sake of abstraction.

---

# Components

Prefer small, focused components.

Reusable components belong in shared.

Page-specific components remain inside their page.

Prefer composition over inheritance.

Do not introduce component abstractions without a concrete reuse or maintainability benefit.

A component does not need to be split merely because it reaches a certain line count.

Split components when doing so improves:

- Readability
- Reusability
- Responsibility separation
- Testing
- Maintainability

Avoid excessive component fragmentation.

---

# Styling

Use SCSS Modules.

Use design tokens for:

- Colors
- Typography
- Spacing
- Shadows
- Border radius

Avoid hardcoded design values whenever practical.

Do not report hardcoded values when they are clearly intentional or when replacing them would not provide meaningful value.

Prefer consistency with the existing design system.

Do not introduce a design-token abstraction for values that are truly one-off and intentionally specific.

---

# Error Handling

Handle API failures gracefully.

Return meaningful feedback to users.

Never expose backend exception messages directly to users.

Backend errors should use structured, predictable responses where appropriate.

Internal exception details should remain server-side.

Do not catch exceptions unnecessarily.

Avoid broad exception handling when a more specific approach is appropriate.

Use centralized exception handling when it improves consistency.

---

# Security

Never trust client-side data.

Assume every client request can be manipulated.

Never rely on:

- Hidden UI elements
- Client-side role checks
- Client-side validation
- Client-provided permissions
- Client-provided ownership information

Never expose:

- Secrets
- Passwords
- Refresh Tokens
- Internal stack traces
- Sensitive infrastructure details

Passwords must never be stored in plaintext.

Use appropriate password hashing mechanisms provided by Spring Security.

Backend authorization must be enforced independently of frontend behavior.

---

# Code Quality

Prefer readable and obvious code over clever code.

Follow existing project conventions before introducing new patterns.

Avoid:

- Unnecessary abstractions
- Premature optimization
- Excessive interfaces
- Generic wrappers with no clear benefit
- Deep inheritance hierarchies
- Excessive utility classes
- Overly generic services
- Architectural patterns added solely for theoretical purity

Prefer:

- Clear names
- Small responsibilities
- Straightforward control flow
- Explicit dependencies
- Simple data transformations
- Consistent patterns
- Code that is easy to debug

Do not optimize for hypothetical future requirements unless there is a reasonable indication they will actually occur.

---

# Existing Codebase Consistency

When modifying existing code, first follow the patterns already established in the project.

Do not introduce a new architectural style when an existing pattern already solves the problem adequately.

If an existing implementation is slightly imperfect but practical and consistent, prefer incremental improvement over rewriting it solely for theoretical correctness.

When introducing a new pattern, there should be a clear reason for it.

Consistency is generally more valuable than isolated architectural perfection.

---

# Development Philosophy

This project should demonstrate professional engineering without unnecessary enterprise complexity.

The preferred approach is:

1. Start with the simplest correct solution.
2. Keep responsibilities clear.
3. Add abstraction only when duplication, coupling, or complexity justifies it.
4. Keep business rules on the backend.
5. Keep the domain reasonably independent from infrastructure.
6. Maintain strong security boundaries.
7. Prefer consistency with the existing codebase.
8. Optimize for maintainability rather than theoretical purity.
9. Do not introduce production-only constraints when they provide no value to this portfolio project.
10. Refactor when complexity becomes real rather than anticipating every hypothetical future requirement.

When choosing between two technically valid solutions, prefer the one that is:

- Simpler
- Easier to understand
- Easier to test
- Easier to modify
- More consistent with the existing codebase

The objective is not to build the most architecturally sophisticated system possible.

The objective is to build a well-engineered, realistic, maintainable School CRM that demonstrates strong software engineering judgment.
