import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/dist/";
import typeDefs from "./GraphQl/schems";
import resolvers from "./GraphQl/index";
import graphqlMiddleware from "./Middlewares/graphMiddleware";

import bodyParser from "body-parser";
import cors from "cors";

import StudentRouter from "./Routes/studentRoutes";
import TeacherRouter from "./Routes/teacherRoutes";
import AuthRouter from "./Routes/authRoutes";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/student", StudentRouter);
app.use("/teacher", TeacherRouter);
app.use("/auth", AuthRouter);

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Connect Apollo with Express
  app.use(
    "/graphql",
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        // Your custom GraphQL auth/role middleware
        return graphqlMiddleware(req, res);
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
  });
}

startServer();
