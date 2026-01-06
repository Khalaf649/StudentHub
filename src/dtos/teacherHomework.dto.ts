import { section } from "../generated/client/enums.js";
export interface CreateHomeworkDTO {
  session_id: number; // ID of the session the homework is linked to
  title: string; // Homework title
  start_date: Date; // ISO 8601 date string (e.g., "2025-03-01T08:00:00Z")
  description: string; // Homework description
  due_date: Date; // ISO 8601 date string (e.g., "2025-03-15T23:59:59Z")
  full_mark: number; // Maximum grade for the homework
}
export interface AssignHomeworkDTO {
  student_id: number; // The student assigned to the homework
  homework_id: number; // The homework assigned to the student
  grade: number; // Grade the student achieved (optional until graded)
  submission_date: Date;
}
export interface HomeworkFilters {
  section?: section;
  center_id?: number;
  id?: number;
}
export interface HomeworkDTO {
  id: number;
  title: string;
  description: string;
  start_date: Date;
  due_date: Date;
  full_mark: number;
  sessions: {
    id: number;
    title: string;
    section: section;
    center_id: number;
  };
}

// submission_date: ISO 8601 date string (e.g., "2025-03-10T14:30:00Z")
