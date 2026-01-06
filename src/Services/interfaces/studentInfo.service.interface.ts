import { getStudentInfoDTO } from "../../dtos/studentInfo.dto.js";

export interface IStudentInfoService {
  getStudentInfo(studentId: number): Promise<getStudentInfoDTO>;
}
