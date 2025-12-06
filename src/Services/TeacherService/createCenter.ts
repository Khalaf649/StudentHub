import prisma from "../../prisma";
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
