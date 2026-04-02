// Student Profile and Account DTOs
export interface UpdateStudentProfileDTO {
  name?: string;
  phone?: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface StudentGradesDTO {
  studentId: number;
  studentName: string;
  averageHomeworkGrade: number;
  averageQuizGrade: number;
  totalGrade: number;
  homeworkCount: number;
  quizCount: number;
}

export interface StudentAttendanceDTO {
  sessionId: number;
  sessionTitle: string;
  status: "present" | "absent";
  sessionDate: Date;
}

export interface StudentHomeworkDetailDTO {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  fullMark: number;
  submittedDate?: Date;
  grade?: number;
  status: "pending" | "submitted" | "graded";
}

export interface StudentQuizDetailDTO {
  id: number;
  title: string;
  description?: string;
  sessionDate: Date;
  fullMark: number;
  obtainedGrade?: number;
  status: "pending" | "completed";
}
