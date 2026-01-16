import { getStudentInfoDTO } from "../../dtos/studentInfo.dto.ts";

export interface IStudentInfoService {
  getStudentInfo(studentId: number): Promise<getStudentInfoDTO>;
}
