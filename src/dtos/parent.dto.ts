// Parent DTOs
export interface CreateParentDTO {
  name: string;
  phone: string;
  email?: string;
  role: "father" | "mother" | "guardian";
}

export interface UpdateParentDTO {
  name?: string;
  phone?: string;
  email?: string;
}

export interface ParentChildDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  section: string;
  center: {
    id: number;
    name: string;
  };
}

export interface ParentChildHomeworkDTO {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  fullMark: number;
  submittedDate?: Date;
  grade?: number;
  status: "pending" | "submitted" | "graded";
}

export interface ParentChildQuizDTO {
  id: number;
  title: string;
  description?: string;
  fullMark: number;
  obtainedGrade?: number;
  status: "pending" | "completed";
}

export interface ParentChildAttendanceDTO {
  sessionId: number;
  sessionTitle: string;
  status: "present" | "absent";
  sessionDate: Date;
}

export interface ParentChildGradesDTO {
  childId: number;
  childName: string;
  averageHomeworkGrade: number;
  averageQuizGrade: number;
  totalGrade: number;
  homeworkCount: number;
  quizCount: number;
  totalAttendance: number;
  presentDays: number;
}
