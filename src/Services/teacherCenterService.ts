import { ITeacherCenterService } from "./interfaces/teacherCenter.service.interface";
import { CreateCenterDTO, getCenterDTO } from "../dtos/teacherCenter.dto";
import prisma from "../lib/prisma";

class TeacherCenterService implements ITeacherCenterService {
  async createCenter(data: CreateCenterDTO): Promise<void> {
    const { name, phone, location } = data;
    await prisma.centers.create({
      data: {
        name: data.name,
        phone: data.phone,
        location: data.location,
      },
    });
  }
  async getCenters(): Promise<getCenterDTO[]> {
    const centers: getCenterDTO[] = await prisma.centers.findMany();
    return centers;
  }
}

export default TeacherCenterService;
