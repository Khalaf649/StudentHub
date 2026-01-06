import { attendance_status, section } from "../generated/client/enums.js";
export interface getStudentSessionsDTO {
  id: number;
  status: attendance_status;
  sessions: {
    title: string;
    session_datetime: Date;
    description: string;
    section: section;
  };
}
