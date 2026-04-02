// Teacher Extended DTOs (update, delete, grading, analytics)

export interface UpdateHomeworkDTO {
  title?: string;
  description?: string;
  start_date?: Date;
  due_date?: Date;
  full_mark?: number;
}

export interface UpdateQuizDTO {
  title?: string;
  description?: string;
  full_mark?: number;
}

export interface GradeHomeworkSubmissionDTO {
  student_id: number;
  homework_id: number;
  grade: number;
}

export interface GradeQuizAssignmentDTO {
  student_id: number;
  quiz_id: number;
  grade: number;
}

export interface StudentPerformanceDTO {
  studentId: number;
  studentName: string;
  email: string;
  phone: string;
  averageHomeworkGrade: number;
  averageQuizGrade: number;
  totalGrade: number;
  attendanceRate: number;
  homeworkSubmissionRate: number;
  quizParticipationRate: number;
}

export interface AttendanceAnalyticsDTO {
  sessionId: number;
  sessionTitle: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  attendanceRate: number;
}

export interface SessionAnalyticsDTO {
  sessionId: number;
  sessionTitle: string;
  date: Date;
  section: string;
  center: string;
  totalEnrolledStudents: number;
  presentStudents: number;
  attendanceRate: number;
  averageHomeworkGrade?: number;
  averageQuizGrade?: number;
}
