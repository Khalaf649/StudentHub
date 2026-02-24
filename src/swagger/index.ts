import swaggerJSDoc from "swagger-jsdoc";
import type { Express } from "express";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "StudentHub API",
    version: "1.0.0",
    description: "Auto-generated OpenAPI definition for StudentHub",
  },
  servers: [
    {
      url: process.env.SWAGGER_SERVER_URL || "http://localhost:3000",
    },
  ],
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  // point at the files containing JSDoc comments describing the API
  apis: ["./src/swagger/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);

/**
 * Mounts the swagger-ui express middleware onto an express application.
 * This function does **not** modify any existing routes/controllers; it
 * simply adds a new `/docs` endpoint to serve the generated specification.
 */
export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
