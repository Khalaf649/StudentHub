import prisma from "../../prisma";

async function getCentersService() {
  const centers = await prisma.centers.findMany();
  return centers;
}

export default getCentersService;
