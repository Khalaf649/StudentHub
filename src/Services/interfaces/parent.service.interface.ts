// Parent Service Interface
import {
  CreateParentDTO,
  UpdateParentDTO,
  ParentChildDTO,
  ParentChildHomeworkDTO,
  ParentChildQuizDTO,
  ParentChildAttendanceDTO,
  ParentChildGradesDTO,
} from "../../dtos/parent.dto.ts";

export interface IParentService {
  getLinkedChildren(parentId: number): Promise<ParentChildDTO[]>;
  getChildHomeworks(
    parentId: number,
    childId: number,
  ): Promise<ParentChildHomeworkDTO[]>;
  getChildQuizzes(
    parentId: number,
    childId: number,
  ): Promise<ParentChildQuizDTO[]>;
  getChildAttendance(
    parentId: number,
    childId: number,
  ): Promise<ParentChildAttendanceDTO[]>;
  getChildGrades(
    parentId: number,
    childId: number,
  ): Promise<ParentChildGradesDTO>;
  unlinkChild(parentId: number, studentParentId: number): Promise<void>;
}
