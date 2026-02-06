import {
  section,
  parent_role,
  attendance_status,
} from "../generated/client/enums.ts";
export interface StudentFilters {
  name?: string;
  page?: number;
  section?: section;
  center_id?: number;
  session_id?: number;
  homework_id?: number;
  quiz_id?: number;
}
export interface StudentWhereInput {
  section?: section;
  center_id?: number;
  name?: {
    startsWith: string;
    mode: "insensitive";
  };
  attendances?: {
    some: {
      session_id: number;
      status: attendance_status;
    };
  };
  homework_submissions?: {
    some: {
      homework_id: number;
    };
  };
  student_quizzes?: {
    some: {
      quiz_id: number;
    };
  };
}
export interface StudentDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  section: section;

  centers: {
    id: number;
    name: string;
  } | null;

  student_parents: {
    role: parent_role;
    parents: {
      id: number;
      name: string;
      phone: string | null;
    };
  }[];
}
