import { section } from "../generated/client/enums.ts";
export interface getStudentInfoDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  section: section;
  centers: {
    name: string;
  };
}
