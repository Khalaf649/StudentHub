import { Section } from "../../generated/prisma/enums";
export interface createSessionDTO {
  title: string;
  description: string;
  center_id: number;
  section: Section;
  session_datetime: Date;
}
export interface getSessionDTO {
  id: number;
  description: string;
  section: Section;
  session_datetime: Date;
  centers: {
    id: number;
    name: string;
  };
}
export interface SessionFilters {
  id?: number;
  section?: Section;
  center_id?: number;
}
