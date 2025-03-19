import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port=process.env.PORT;
import bodyparser from "body-parser";
import StudentRouter from "./Routes/studentRoutes";
import TeacherRouter from "./Routes/teacherRoutes";
import AuthRouter from "./Routes/authRoutes";
const app=express();
app.use(bodyparser.json());
app.use("/student",StudentRouter);
app.use("/teacher",TeacherRouter);
app.use("/auth",AuthRouter);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});