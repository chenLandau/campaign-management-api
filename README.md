# OnePlatform - Campaign Management API

A production-ready, highly organized REST API built with Node.js, TypeScript, and Express. The project follows a modular, layer-separated architecture (Domain/Infrastructure Split) to ensure scalability and ease of testing.

## Core Features

- **Full Campaign CRUD**: Complete lifecycle management for marketing campaigns.
- **In-Memory Database**: Powered by `mongodb-memory-server`. No local MongoDB installation required; the database spins up and seeds automatically in memory upon server initialization.
- **Structured JSON Logging**: Implemented a custom color-coded internal logging class supporting levels (`info`, `warn`, `error`, `debug`) that calculates real-time API latency.
- **Schema Validation**: Incoming payloads for `POST` and `PATCH` routes are validated securely via `Joi`.
- **Automated Integration Tests**: Full-coverage test suite built using ESM-configured `Jest` and `Supertest`.

---

## 📂 Project Architecture

```text
src
├── app.ts                    # Express instance config, global middlewares & routes
├── server.ts                 # Loads dotenv, inits DB, handles app.listen
├── common
│   ├── database              # MongoDB Memory Server setup
│   ├── init                  # Packages initialization (mongo init)
│   ├── logger                # Custom Structured JSON Logger Class
│   ├── middlewares           # Terminal request logging middleware
│   └── statuses              # Network status code definitions
└── services
    └── campaign
        ├── domain            # Business logic (Routers, Services)
        ├── infrastructure    # Data access layer (Repositories, Joi Schemas)
        └── tests             # Integration tests (Jest & Supertest)
```

### 1. Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v18 or higher recommended)
- npm

### 2. Installation

Clone the repository, open your terminal in the project root folder, and install all required dependencies:

```bash
npm install
```

### 3. Running the Application in Development Mode

```bash
npm run dev
```

### 4. Compiling & Running Production Build

```bash
npm run build
npm start
```

### 5. Running tests

```bash
npm test
```
