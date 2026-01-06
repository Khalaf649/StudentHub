// services/interfaces/teacherCenter.service.interface.ts

import { CreateCenterDTO, getCenterDTO } from "../../dtos/teacherCenter.dto.js";

export interface ITeacherCenterService {
  createCenter(data: CreateCenterDTO): Promise<void>;

  getCenters(): Promise<getCenterDTO[]>;
}
