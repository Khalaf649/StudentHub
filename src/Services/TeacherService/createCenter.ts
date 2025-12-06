import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createCenterService(
  name: string,
  location: string,
  phone: string
) {
  const center = await prisma.centers.create({
    data: {
      name,
      location,
      phone,
    },
  });
  return center;
}
export default createCenterService;
