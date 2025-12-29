import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express, { Request } from "express"; // Import Request type
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

import typeDefs from "./GraphQl/schems";
import resolvers from "./GraphQl/index";

import StudentRouter from "./Routes/studentRoutes";
import TeacherRouter from "./Routes/teacherRoutes";
import AuthRouter from "./Routes/authRoutes";

// Define an interface for your Context
interface MyContext {
  user: string | string[] | null;
}

const PORT: number = Number(process.env.PORT);

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Pass the Context type to ApolloServer
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(cors());
  app.use(bodyParser.json());

  app.use("/student", StudentRouter);
  app.use("/teacher", TeacherRouter);
  app.use("/auth", AuthRouter);

  // Fix: Explicitly type the context argument or the generic
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }: { req: Request }): Promise<MyContext> => {
        return {
          user: req.headers.user || null,
        };
      },
    })
  );

  httpServer.listen(PORT, () => {
    console.log(` Server ready at Port ${PORT}`);
  });
}

startServer();
