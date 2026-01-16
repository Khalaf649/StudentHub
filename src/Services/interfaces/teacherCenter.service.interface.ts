// services/interfaces/teacherCenter.service.interface.ts

import { CreateCenterDTO, getCenterDTO } from "../../dtos/teacherCenter.dto.ts";

export interface ITeacherCenterService {
  createCenter(data: CreateCenterDTO): Promise<void>;

  getCenters(): Promise<getCenterDTO[]>;
}
