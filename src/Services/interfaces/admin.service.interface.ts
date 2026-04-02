// Admin Service Interface
import {
  AdminRegisterUserDTO,
  AdminUpdateUserDTO,
  AdminUserListDTO,
  AdminStatisticsDTO,
  AdminReportDTO,
} from "../../dtos/admin.dto.ts";
import { parent_role, linkage_status } from "../../generated/client/enums.ts";

export interface LinkParentStudentDTO {
  studentId: number;
  parentId: number;
  role: parent_role;
}

export interface UpdateParentLinkageDTO {
  status: linkage_status;
}

export interface IAdminService {
  registerUser(data: AdminRegisterUserDTO): Promise<void>;
  getUsers(filters: any): Promise<AdminUserListDTO[]>;
  updateUser(userId: number, data: AdminUpdateUserDTO): Promise<void>;
  deleteUser(userId: number): Promise<void>;
  getStatistics(): Promise<AdminStatisticsDTO>;
  generateReport(type: string, filters?: any): Promise<AdminReportDTO>;
  getUserById(userId: number): Promise<any>;
  linkParentToStudent(
    data: LinkParentStudentDTO,
    adminId: number,
  ): Promise<void>;
  unlinkParentFromStudent(studentId: number, parentId: number): Promise<void>;
  getStudentParents(studentId: number): Promise<any[]>;
  getParentStudents(parentId: number): Promise<any[]>;
  approvePendingLinkage(studentId: number, parentId: number): Promise<void>;
  updateLinkageStatus(
    studentId: number,
    parentId: number,
    data: UpdateParentLinkageDTO,
  ): Promise<void>;
}
