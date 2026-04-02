// Admin Service Interface
import {
  AdminRegisterUserDTO,
  AdminUpdateUserDTO,
  AdminUserListDTO,
  AdminStatisticsDTO,
  AdminReportDTO,
} from "../../dtos/admin.dto.ts";

export interface IAdminService {
  registerUser(data: AdminRegisterUserDTO): Promise<void>;
  getUsers(filters: any): Promise<AdminUserListDTO[]>;
  updateUser(userId: number, data: AdminUpdateUserDTO): Promise<void>;
  deleteUser(userId: number): Promise<void>;
  getStatistics(): Promise<AdminStatisticsDTO>;
  generateReport(type: string, filters?: any): Promise<AdminReportDTO>;
  getUserById(userId: number): Promise<any>;
}
