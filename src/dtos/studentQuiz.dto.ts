export interface getStudentQuizDTO {
  grade: number;
  quizzes: {
    id: number;
    title: string;
    description: string | null;
    full_mark: number;
  };
}
