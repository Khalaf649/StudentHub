// Admin DTOs
export interface AdminRegisterUserDTO {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "student" | "teacher" | "admin";
  section?:
    | "first_sec"
    | "second_sec_scientific"
    | "second_sec_literary"
    | "third_sec";
  center_id?: number;
}

export interface AdminUpdateUserDTO {
  name?: string;
  email?: string;
  phone?: string;
  section?: string;
  center_id?: number;
}

export interface AdminUserListDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: Date;
  status: "active" | "inactive";
}

export interface AdminStatisticsDTO {
  totalStudents: number;
  totalTeachers: number;
  totalAdmins: number;
  totalCenters: number;
  totalSessions: number;
  totalHomeworks: number;
  totalQuizzes: number;
}

export interface AdminReportDTO {
  type: "attendance" | "grades" | "sessions" | "engagement";
  generatedAt: Date;
  data: any;
}
