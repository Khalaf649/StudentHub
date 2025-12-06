import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./GraphQl/schems";
import { resolvers } from "./GraphQl/resolvers/index";

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
async function startGraphQL() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}

startGraphQL();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
