import {
  createStudentParentDTO,
  getStudentParentsDTO,
} from "../../dtos/studentParent.dto.js";

export interface IStudentParentService {
  createStudentParent(
    studentId: number,
    data: createStudentParentDTO
  ): Promise<void>;
  getStudentParents(studentId: number): Promise<getStudentParentsDTO[]>;
}
