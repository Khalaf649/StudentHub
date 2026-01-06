import { section } from "../generated/client/enums.js";
export interface CreateQuizDTO {
  session_id: number; // ID of the session the quiz is linked to
  title: string; // Title of the quiz
  description?: string; // Description of the quiz
  full_mark: number; // Maximum possible score for the quiz
}
export interface AssignQuizDTO {
  student_id: number; // The student taking the quiz
  quiz_id: number; // The quiz assigned to the student
  grade: number; // Grade the student achieved
}
export interface QuizFilters {
  id?: number;
  section?: string;
  center_id?: number;
}
export interface QuizDTO {
  id: number;
  title: string;
  description: string | null;
  full_mark: number;
  sessions: {
    id: number;
    title: string;
    section: section;
    center_id: number;
  };
}
