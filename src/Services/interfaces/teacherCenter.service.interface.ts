// services/interfaces/teacherCenter.service.interface.ts

import {
  CreateCenterDTO,
  getCenterDTO,
  UpdateCenterDTO,
  GetCenterNameOnlyDTO,
} from "../../dtos/teacherCenter.dto.ts";

export interface ITeacherCenterService {
  createCenter(data: CreateCenterDTO): Promise<void>;

  getCenters(): Promise<getCenterDTO[]>;

  getCentersNameOnly(): Promise<GetCenterNameOnlyDTO[]>;

  updateCenter(centerId: number, data: UpdateCenterDTO): Promise<void>;

  deleteCenter(centerId: number): Promise<void>;
}
