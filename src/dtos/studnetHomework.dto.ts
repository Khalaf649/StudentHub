export interface getStudentHomeworkDTO {
  id: number;
  grade: number;
  submission_date: Date;
  homeworks: {
    start_date: Date;
    due_date: Date;
    description: string;
    title: string;
    full_mark: number;
  };
}
