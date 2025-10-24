# 🚀 StudentHub API

An academic management backend built with **Node.js**, **Express**, and **Postgres** — enabling teachers, students, and parents to track performance, sessions, and progress.

## 📚 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Run Locally](#run-locally)
- [Contributing](#contributing)
- [License](#license)

## 🧩 About the Project

The StudentHub API allows teachers to manage student sessions, quizzes, and centers.
It provides secure authentication, data tracking, and analytics endpoints.

## ✨ Features

- 🔐 JWT-based authentication
- 📁 File upload support
- 🧮 Student and session tracking
- 🧾 Admin dashboards
- 🧰 RESTful API design

## 🗂 Folder Structure

backend/
├── dist/ # Compiled JS output (after build)
├── node_modules/
├── prisma/ # Prisma schema and migrations
├── src/
│ ├── Controllers/ # Business logic
│ ├── Interfaces/ # TypeScript interfaces and types
│ ├── Middlewares/ # Authentication & error handling
│ ├── Routes/ # API routes
│ ├── Validation/ # Input validation schemas
│ └── app.ts # App entry point
├── .env # Environment variables
├── package.json
├── tsconfig.json
└── README.md

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma** (with PostgreSQL)
- **JWT** (for authentication)
- **Express-validator** (for validation)

---

## 🧩 Features

- 🧠 Modular architecture with Controllers, Routes, and Middlewares
- 🔐 Authentication using JWT
- 🗃 Database access via Prisma ORM
- ✅ Input validation
- 📚 Integrated Swagger documentation

---

## 🧑‍💻 Installation

```bash
git clone https://github.com/Khalaf649/StudentHub
cd StudentHub
npm install
```
