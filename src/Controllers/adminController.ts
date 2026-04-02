import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../dtos/auth.dto.ts";
import { IAdminService } from "../Services/interfaces/admin.service.interface.ts";
import { AdminRegisterUserDTO, AdminUpdateUserDTO } from "../dtos/admin.dto.ts";
import AdminService from "../Services/adminService.ts";
import { ResponseHandler } from "../utils/responseWrapper.ts";

class AdminController {
  constructor(private readonly adminService: IAdminService) {}

  async registerUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const data: AdminRegisterUserDTO = req.body;

      await this.adminService.registerUser(data);
      res
        .status(201)
        .json(ResponseHandler.success(null, "User registered successfully"));
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const filters = req.query;

      const users = await this.adminService.getUsers(filters);
      res.status(200).json(ResponseHandler.success(users));
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      const data: AdminUpdateUserDTO = req.body;

      await this.adminService.updateUser(userId, data);
      res
        .status(200)
        .json(ResponseHandler.success(null, "User updated successfully"));
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);

      await this.adminService.deleteUser(userId);
      res
        .status(200)
        .json(ResponseHandler.success(null, "User deleted successfully"));
    } catch (err) {
      next(err);
    }
  }

  async getStatistics(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stats = await this.adminService.getStatistics();
      res.status(200).json(ResponseHandler.success(stats));
    } catch (err) {
      next(err);
    }
  }

  async generateReport(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const type = req.query.type as string;
      const filters = req.query;

      const report = await this.adminService.generateReport(type, filters);
      res.status(200).json(ResponseHandler.success(report));
    } catch (err) {
      next(err);
    }
  }

  async getUserById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);

      const user = await this.adminService.getUserById(userId);
      res.status(200).json(ResponseHandler.success(user));
    } catch (err) {
      next(err);
    }
  }
}

const adminService = new AdminService();
const adminController = new AdminController(adminService);

export const registerUser = adminController.registerUser.bind(adminController);
export const getUsers = adminController.getUsers.bind(adminController);
export const updateUser = adminController.updateUser.bind(adminController);
export const deleteUser = adminController.deleteUser.bind(adminController);
export const getStatistics =
  adminController.getStatistics.bind(adminController);
export const generateReport =
  adminController.generateReport.bind(adminController);
export const getUserById = adminController.getUserById.bind(adminController);

export default AdminController;
