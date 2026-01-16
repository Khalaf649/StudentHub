import { section, parent_role } from "../generated/client/enums.ts";
export interface StudentFilters {
  id?: number;
  section?: section;
  center_id?: number;
  session_id?: number;
  homework_id?: number;
  quiz_id?: number;
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
