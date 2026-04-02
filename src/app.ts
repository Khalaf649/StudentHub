import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Routers
import TeacherRouter from "./Routes/teacherRoutes.ts";
import AuthRouter from "./Routes/authRoutes.ts";
import StudentRouter from "./Routes/studentRoutes.ts";
import StudentProfileRouter from "./Routes/studentProfileRoutes.ts";
import ParentRouter from "./Routes/parentRoutes.ts";
import AdminRouter from "./Routes/adminRoutes.ts";
import TeacherAnalyticsRouter from "./Routes/teacherAnalyticsRoutes.ts";
import errorHandler from "./Middlewares/errorHandler.ts";

// swagger helper (non‑invasive; does not touch controllers or routes)
import { setupSwagger } from "./swagger/index.ts";

const PORT = process.env.port || 3000;

async function startServer() {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(bodyParser.json());

  // REST routes
  app.use("/student", StudentRouter);
  app.use("/student/profile", StudentProfileRouter);
  app.use("/teacher", TeacherRouter);
  app.use("/teacher/analytics", TeacherAnalyticsRouter);
  app.use("/parent", ParentRouter);
  app.use("/admin", AdminRouter);
  app.use("/auth", AuthRouter);

  // swagger UI (optional) – only modifies the main app file, not any
  // router/service/controller logic.  The spec itself is generated via
  // a separate script (see package.json).
  setupSwagger(app);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
