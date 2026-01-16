import {
  createStudentParentDTO,
  getStudentParentsDTO,
} from "../../dtos/studentParent.dto.ts";

export interface IStudentParentService {
  createStudentParent(
    studentId: number,
    data: createStudentParentDTO
  ): Promise<void>;
  getStudentParents(studentId: number): Promise<getStudentParentsDTO[]>;
}
