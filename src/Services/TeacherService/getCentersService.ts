import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getCentersService() {
  const centers = await prisma.centers.findMany();
  return centers;
}

export default getCentersService;
