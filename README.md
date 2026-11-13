# SkillSphere – Academic Mini Project

A gamified student learning and quiz platform built with React, Spring Boot, and MySQL.

## Features
- Student registration and login (academic demo; no production authentication)
- Dashboard with available quizzes and personal statistics
- Multiple-choice quizzes with automatic scoring
- Attempt history and leaderboard
- Admin/demo quiz creation API
- Responsive modern dark-purple UI

## Technology
- Frontend: React 18, Vite, React Router, plain CSS
- Backend: Java 17, Spring Boot 3.3, Spring Web, Spring Data JPA
- Database: MySQL 8

## Requirements
- JDK 17+
- Node.js 18+
- MySQL 8+
- Maven 3.8+ (or use the included Maven wrapper if you add one)

## 1. Create the database
Start MySQL and run:

```sql
CREATE DATABASE skillsphere;
```

The backend uses `spring.jpa.hibernate.ddl-auto=update` to create/update tables.
Sample quizzes and questions are inserted automatically on first startup if no quizzes exist.

## 2. Configure backend
Copy the example environment file and adjust the database settings for your machine:

```bash
copy .env.example .env
```

Then update the values in `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=skillsphere
DB_USERNAME=root
DB_PASSWORD=your_password
PORT=8080
```

In PowerShell, load them before starting the backend:

```powershell
$env:DB_HOST = 'localhost'
$env:DB_PORT = '3306'
$env:DB_NAME = 'skillsphere'
$env:DB_USERNAME = 'root'
$env:DB_PASSWORD = 'your_password'
$env:PORT = '8080'
```

Run the backend from the `backend` directory:

```bash
mvn spring-boot:run
```

Backend URL: http://localhost:8080

Health check: http://localhost:8080/api/health

### Deploying on Railway

This repository contains two separate apps. In Railway, set the service's **Root Directory** to `backend` to deploy the Spring Boot API; Railpack can then detect `pom.xml`. To deploy the Vite UI, create a separate service with Root Directory `frontend`.

For the backend service, add these variables under **Variables** in Railway. Do not rely on a local `.env` file being present in a GitHub deployment:

- `DB_HOST`: the external MySQL hostname from your database provider (not `localhost`)
- `DB_PORT`: the provider's MySQL port
- `DB_NAME`: the database/schema name
- `DB_USERNAME` and `DB_PASSWORD`: the database credentials
- `PORT`: leave this to Railway

If the database provider gives you a JDBC URL or requires TLS options, set `SPRING_DATASOURCE_URL` to that URL. It overrides the default assembled from the `DB_*` values. Ensure your database provider allows inbound connections from Railway and follow its TLS/network requirements. Never commit real credentials.

## 3. Run frontend
Open another terminal:

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

Open the URL printed by Vite (normally http://localhost:5173).

To point the UI at a different backend URL, create a `frontend/.env` file:

```env
VITE_API_URL=http://localhost:8080/api
```

## 4. Demo workflow
1. Register a student account.
2. Sign in and open Dashboard.
3. Select a quiz and submit answers.
4. View your score in Results and your previous attempts in History.
5. Open Leaderboard to compare scores.

## API summary
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register student |
| POST | `/api/auth/login` | Login |
| GET | `/api/quizzes` | List quizzes |
| GET | `/api/quizzes/{id}` | Quiz with questions |
| POST | `/api/attempts` | Submit quiz attempt |
| GET | `/api/attempts/user/{userId}` | User attempt history |
| GET | `/api/leaderboard` | Top scores |
| GET | `/api/health` | Health check |

### Submit attempt JSON
```json
{
  "userId": 1,
  "quizId": 1,
  "answers": [
    {"questionId": 1, "selectedOption": "B"},
    {"questionId": 2, "selectedOption": "A"}
  ]
}
```

## Academic notes
- This is a learning/demo application. Login is intentionally simplified and must not be used for real accounts.
- For production, add Spring Security, BCrypt password hashing, JWT/session management, role-based authorization, validation, rate limiting, and database migrations.
- The project uses a modular three-layer backend: Controller (presentation/API), Service (business logic), Repository (data access).
- The syllabus microservices topic can be demonstrated as a next extension: split `AuthController/UserService` into User Service and quiz/attempt modules into Challenge Service. This starter runs as one service to keep the academic project easy to build and explain.
