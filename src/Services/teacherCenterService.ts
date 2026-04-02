import { ITeacherCenterService } from "./interfaces/teacherCenter.service.interface.ts";
import {
  CreateCenterDTO,
  getCenterDTO,
  UpdateCenterDTO,
  GetCenterNameOnlyDTO,
} from "../dtos/teacherCenter.dto.ts";
import prisma from "../lib/prisma.ts";

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

  async getCentersNameOnly(): Promise<GetCenterNameOnlyDTO[]> {
    const centers: GetCenterNameOnlyDTO[] = await prisma.centers.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return centers;
  }

  async updateCenter(centerId: number, data: UpdateCenterDTO): Promise<void> {
    await prisma.centers.update({
      where: { id: centerId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.location && { location: data.location }),
        ...(data.phone && { phone: data.phone }),
      },
    });
  }

  async deleteCenter(centerId: number): Promise<void> {
    await prisma.centers.delete({
      where: { id: centerId },
    });
  }
}

export default TeacherCenterService;
