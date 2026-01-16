import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

// Routers
import TeacherRouter from "./Routes/teacherRoutes.ts";
import AuthRouter from "./Routes/authRoutes.ts";
import StudentRouter from "./Routes/studentRoutes.ts";
import errorHandler from "./Middlewares/errorHandler.ts";

const PORT = process.env.port || 3000;

async function startServer() {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(bodyParser.json());

  // REST routes
  app.use("/student", StudentRouter);
  app.use("/teacher", TeacherRouter);
  app.use("/auth", AuthRouter);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  app.use(errorHandler);
}

startServer();
