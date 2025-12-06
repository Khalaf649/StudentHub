export interface CreateCenterBody {
  name: string;
  location: string;
  phone: string;
}

export interface CreateSessionBody {
  title: string;
  description: string;
  centerId: number;
  section:
    | "first_sec"
    | "second_sec_scientific"
    | "second_sec_literary"
    | "third_sec";
  sessionDatetime: string;
}
export interface StudentSessionRequestBody {
  studentId: number; // The student attending the session
  sessionId: number; // The session being attended
  status: "present" | "absent"; // Attendance status
}
export interface StudentHomeworkRequestBody {
  studentId: number; // The student assigned to the homework
  homeworkId: number; // The homework assigned to the student
  grade: number; // Grade the student achieved (optional until graded)
  submissionDate: string; // ISO 8601 date string (optional until submitted)
}
export interface StudentQuizRequestBody {
  studentId: number; // The student taking the quiz
  quizId: number; // The quiz assigned to the student
  grade: number; // Grade the student achieved (optional until graded)
}

export interface CreateHomeworkRequestBody {
  sessionId: number; // ID of the session the homework is linked to
  title: string; // Homework title
  startDate: string; // ISO 8601 date string (e.g., "2025-03-01T08:00:00Z")
  description: string; // Homework description
  dueDate: string; // ISO 8601 date string (e.g., "2025-03-15T23:59:59Z")
  fullMark: number; // Maximum grade for the homework
}

export interface CreateQuizRequestBody {
  session_id: number; // ID of the session the quiz is linked to
  title: string; // Title of the quiz
  description: string; // Description of the quiz
  full_mark: number; // Maximum possible score for the quiz
}

export interface CreateTrialRequestBody {
  description: string; // Description of the trial
  date: string; // ISO 8601 date string (e.g., "2025-03-15T10:00:00Z")
  maxScore: number; // Maximum possible score for the trial
  section:
    | "first_sec"
    | "second_sec_scientific"
    | "second_sec_literary"
    | "third_sec"; // Enum for student sections
  teacherId?: number; // Optional, teacher ID (nullable)
  centerId?: number; // Optional, center ID (nullable)
}

export interface RegisterStudentRequestBody {
  name: string;
  phone: string;
  email: string;
  password: string;
  section:
    | "first_sec"
    | "second_sec_scientific"
    | "second_sec_literary"
    | "third_sec";
  center_id: number;
}
export interface CreateParentRequestBody {
  name: string;
  phone: string;
  relationship: "father" | "mother" | "guardian";
}
export interface LoginRequestBody {
  email: string;
  password: string;
  role: string;
}
