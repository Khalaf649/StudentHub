import { section, attendance_status } from "../generated/client/enums.js";
export interface createSessionDTO {
  title: string;
  description: string;
  center_id: number;
  section: section;
  session_datetime: Date;
}
export interface getSessionDTO {
  id: number;
  description: string;
  section: section;
  session_datetime: Date;
  centers: {
    id: number;
    name: string;
  };
}
export interface SessionFilters {
  id?: number;
  section?: section;
  center_id?: number;
}

export interface assignSessionDTO {
  student_id: number;
  session_id: number;
  status: attendance_status;
}
