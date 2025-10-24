import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { setupSwagger } from "./swagger";
const PORT = process.env.PORT;
import bodyparser from "body-parser";
import StudentRouter from "./Routes/studentRoutes";
import TeacherRouter from "./Routes/teacherRoutes";
import AuthRouter from "./Routes/authRoutes";
import cors from "cors";
const app = express();

app.use(cors());
app.use(bodyparser.json());

app.use("/student", StudentRouter);
app.use("/teacher", TeacherRouter);
app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
