import { writeFileSync } from "fs";
// ts-node/esm is used during development so we can import the
// typescript module directly with its ".ts" extension.
import { swaggerSpec } from "./index.ts";

const outputPath = process.env.SWAGGER_OUTPUT_PATH || "./swagger.json";

// swaggerSpec is a plain JSON object, just stringify it
writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));
console.log(`swagger definition written to ${outputPath}`);
