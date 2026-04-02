# 📚 StudentHub

```
   _____ _              _            _   _       _
  / ____| |            | |          | | | |     | |
 | (___ | |_ _   _  __| | ___ _ __ | |_| |_   _| |__
  \___ \| __| | | |/ _` |/ _ \ '_ \| __| | | | | '_ \
  ____) | |_| |_| | (_| |  __/ | | | |_| | |_| | |_) |
 |_____/ \__|\__,_|\__,_|\___|_| |_|\__|_|\__,_|_.__/

  Your Complete Educational Management System
```

---

## 🚀 Overview

**StudentHub** is a comprehensive, production-ready educational management platform designed for schools, educational centers, and online learning institutions. It provides an intuitive interface for students, teachers, parents, and administrators to manage academic activities efficiently.

Built with **TypeScript**, **Express**, **Prisma ORM**, and **PostgreSQL**, StudentHub follows clean architecture principles and industry best practices, making it perfect for a professional portfolio.

---

## ✨ Key Features

### 👨‍🎓 **For Students**

- 📝 **Profile Management** - Update personal information and password
- 📊 **Grade Tracking** - View homework and quiz grades with detailed analytics
- 📅 **Attendance Record** - Track class attendance and session participation
- 📚 **Homework & Quizzes** - View assignments, due dates, and results
- 👪 **Parent Linking** - Connect with parent/guardian accounts

### 👨‍🏫 **For Teachers**

- 📋 **Content Management** - Create and manage sessions, homework, and quizzes
- ✅ **Grading System** - Grade student submissions with audit trails
- 📊 **Analytics & Reports** - Track student performance and attendance metrics
- 👥 **Student Management** - View and filter students by various criteria
- 🎯 **Performance Insights** - Generate detailed performance reports

### 👨‍👩‍👧 **For Parents**

- 👶 **Child Monitoring** - View all linked children's academic progress
- 📊 **Academic Overview** - Track grades, homework, and quiz performance
- 📅 **Attendance Tracking** - Monitor class attendance
- 📈 **Progress Reports** - Receive comprehensive progress summaries
- 🔔 **Real-time Updates** - Stay informed about academic activities

### ⚙️ **For Administrators**

- 👥 **User Management** - Create and manage users across all roles
- 📊 **System Analytics** - View comprehensive platform statistics
- 📈 **Report Generation** - Generate various system reports
- 🔐 **Role-Based Access** - Manage permissions and access levels
- 📋 **Center Management** - Manage educational centers and facilities

---

## 🛠️ Technology Stack

| Layer                 | Technology                      |
| --------------------- | ------------------------------- |
| **Backend**           | Node.js, Express.js, TypeScript |
| **Database**          | PostgreSQL, Prisma ORM          |
| **Authentication**    | JWT (JSON Web Tokens)           |
| **API Documentation** | Swagger/OpenAPI 3.0             |
| **Validation**        | Express Validator               |
| **Password Hashing**  | Bcrypt                          |
| **Deployment**        | Vercel                          |

---

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Khalaf649/StudentHub.git
   cd StudentHub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your database credentials and JWT secret:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/studenthub
   JWT_SECRET=your_secret_key_here
   port=3000
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma client**

   ```bash
   npm run generate
   ```

6. **Build the project**

   ```bash
   npm run build
   ```

7. **Start the server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`  
API Documentation (Swagger UI) will be at `http://localhost:3000/docs`

---

## 🚀 Deployment

### Deploy to Vercel

StudentHub is configured for seamless deployment to Vercel:

1. **Push your code to GitHub**

   ```bash
   git push origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel project settings
   - Deploy with one click!

3. **Access your deployment**
   - Your API will be live at: `https://your-project.vercel.app`
   - Swagger UI available at: `https://your-project.vercel.app/docs`

---

## 📚 API Documentation

Complete API documentation is available through **Swagger UI** at `/docs` endpoint.

### Quick API Reference

#### Authentication

```bash
POST   /auth/login                    # Login
POST   /auth/register/student         # Register as Student
POST   /auth/register/teacher         # Register as Teacher
```

#### Student Endpoints

```bash
GET    /student/sessions              # View enrolled sessions
GET    /student/homeworks             # View homework assignments
GET    /student/quizzes               # View quiz assignments
PUT    /student/profile               # Update profile
POST   /student/change-password       # Change password
GET    /student/grades                # View grades
DELETE /student/account               # Delete account
```

#### Parent Endpoints

```bash
GET    /parent/children               # View linked children
GET    /parent/child/:id/homeworks    # View child's homework
GET    /parent/child/:id/grades       # View child's grades
GET    /parent/child/:id/attendance   # View child's attendance
```

#### Teacher Endpoints

```bash
POST   /teacher/session               # Create session
POST   /teacher/homework              # Create homework
POST   /teacher/quiz                  # Create quiz
PUT    /teacher/homework/:id          # Update homework
DELETE /teacher/session/:id           # Delete session
POST   /teacher/homework/:id/grade    # Grade submission
GET    /teacher/analytics/student/:id/performance  # Student analytics
```

#### Admin Endpoints

```bash
POST   /admin/users/register          # Create user
GET    /admin/users                   # List users
GET    /admin/statistics              # System statistics
GET    /admin/reports                 # Generate reports
```

For complete endpoint documentation, visit `/docs` after starting the server.

---

## 🔐 Security Features

- ✅ **JWT Authentication** - Secure user sessions with JWT tokens
- ✅ **Password Hashing** - Bcrypt hashing for secure password storage
- ✅ **Role-Based Access Control** - Fine-grained permissions for each role
- ✅ **Soft Deletes** - Data protection with soft delete timestamps
- ✅ **Audit Trails** - Track changes with timestamps and user attribution
- ✅ **Input Validation** - Comprehensive validation on all endpoints
- ✅ **CORS Protection** - Cross-Origin Resource Sharing configuration
- ✅ **Error Handling** - Standardized error responses

---

## 📊 Database Schema

The application uses a relational PostgreSQL database with the following key entities:

- **Users**: Students, Teachers, Admins
- **Sessions**: Classes/lectures organized by sections and centers
- **Homework**: Assignments with due dates and grading
- **Quizzes**: Assessments with automatic grading
- **Attendance**: Track student session participation
- **Parents**: Parent/Guardian accounts linked to students
- **Centers**: Educational institutions/centers

All tables include audit fields (`createdAt`, `updatedAt`, `deletedAt`) for data integrity.

---

## 🎯 Project Structure

```
StudentHub/
├── src/
│   ├── Controllers/          # Request handlers
│   ├── Services/             # Business logic
│   ├── Routes/               # API endpoints
│   ├── Middlewares/          # Authentication, validation, error handling
│   ├── Validations/          # Input validation rules
│   ├── DTOs/                 # Data transfer objects
│   ├── errors/               # Custom error classes
│   ├── generated/            # Prisma generated client
│   ├── lib/                  # Utilities and helpers
│   ├── swagger/              # API documentation
│   ├── utils/                # Common utilities
│   └── app.ts                # Express app setup
├── prisma/
│   └── schema.prisma         # Database schema
├── dist/                     # Compiled JavaScript
├── .env.example              # Environment template
├── vercel.json              # Vercel deployment config
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies
└── README.md                # This file
```

---

## 💻 Development

### Scripts

```bash
# Start development server with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Generate Prisma Client
npm run generate

# Generate Swagger documentation
npm run swagger:generate
```

### Code Quality

- **TypeScript** for type safety
- **Express Validator** for input validation
- **Prisma ORM** for database operations
- **Standardized Response Format** for consistent API responses

---

## 📝 API Response Format

All API endpoints return consistent JSON responses:

**Success Response**

```json
{
  "success": true,
  "data": {
    /* response data */
  },
  "message": "Operation successful"
}
```

**Error Response**

```json
{
  "success": false,
  "message": "Error message",
  "errors": ["error1", "error2"]
}
```

---

## 🤝 Contributing

This project is primarily a portfolio project. However, if you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Khalaf649**

- GitHub: [@Khalaf649](https://github.com/Khalaf649)
- Project: [StudentHub Repository](https://github.com/Khalaf649/StudentHub)

---

## 🙏 Acknowledgments

- TypeScript and Express.js communities
- Prisma ORM for excellent database tooling
- Swagger/OpenAPI for API documentation standards
- Vercel for seamless deployment

---

## 📞 Support

For issues, questions, or suggestions:

1. Check API documentation at `/docs` endpoint
2. Review GitHub issues
3. Refer to error messages for debugging

---

**Quick Links**

- 📖 [Swagger API Documentation](#) (at `/docs`)
- 🚀 [Live Demo](#) (when deployed)
- 📊 [Database Schema](prisma/schema.prisma)
- 🔧 [Getting Started](#installation)

---

<div align="center">

### Made with ❤️ for educational institutions

**Ready to manage your educational institution efficiently? Deploy StudentHub today!**

</div>
