import prisma from "../../prisma";
import { CreateCenterBody } from "../../Interfaces/RequestBodies";
async function createCenterService(requestBody: CreateCenterBody) {
  const { name, location, phone } = requestBody;
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
