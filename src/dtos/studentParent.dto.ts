import { parent_role } from "../generated/client/enums.js";
export interface createStudentParentDTO {
  name: string;
  phone: string;
  relationship: parent_role;
}
export interface getStudentParentsDTO {
  role: parent_role;
  parents: {
    id: number;
    name: string;
    phone: string;
  };
}
