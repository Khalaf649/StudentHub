import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import typeDefs from "./GraphQl/schems";
import resolvers from "./GraphQl/index";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import StudentRouter from "./Routes/studentRoutes";
import TeacherRouter from "./Routes/teacherRoutes";
import AuthRouter from "./Routes/authRoutes";

const PORT: number = Number(process.env.PORT) || 4000;

// --- Express App for REST routes ---
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/student", StudentRouter);
app.use("/teacher", TeacherRouter);
app.use("/auth", AuthRouter);

// --- Apollo Server ---
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  // startStandaloneServer automatically handles HTTP
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req }) => {
      // Here you can attach auth info from headers
      return { user: req.headers.user || null };
    },
  });

  console.log(` GraphQL server running at ${url}`);
  console.log(`REST server running at http://localhost:${PORT}`);
}

startServer();
