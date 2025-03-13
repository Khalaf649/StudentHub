export  interface CreateCenterBody {
    name: string;
    location: string;
    phone:String;
  }
  
  export interface CreateSessionBody {
    teacherId: number;
    date: string;
    centerId: number;
    topic: string;
    section: "first_sec" | "second_sec_scientific" | "second_sec_literary" | "third_sec"; // Valid sections

  }
  
  export interface HomeworkRequestBody {
    sessionId: number; // ID of the session the homework is linked to
    description: string; // Homework description
    dueDate: string; // ISO 8601 date string (e.g., "2025-03-15T23:59:59Z")
  }
  
  export interface QuizRequestBody {
    sessionId: number; // ID of the session the quiz is linked to
    maxScore: number; // Maximum possible score for the quiz
    date: string; // ISO 8601 date string (e.g., "2025-03-15T10:00:00Z")
  }
  
  export interface TrialRequestBody {
    description: string; // Description of the trial
    date: string; // ISO 8601 date string (e.g., "2025-03-15T10:00:00Z")
    maxScore: number; // Maximum possible score for the trial
    section: "first_sec" | "second_sec_scientific" | "second_sec_literary" | "third_sec"; // Enum for student sections
    teacherId?: number; // Optional, teacher ID (nullable)
    centerId?: number; // Optional, center ID (nullable)
  }
  
  export interface StudentRequestBody {
    name: string;
    phone?: string;
    email?: string;
    password: string;
    section: "first_sec" | "second_sec_scientific" | "second_sec_literary" | "third_sec";
    center_id?: number;
  }
  export interface ParentRequestBody {
    name: string;
    phone: string;
    email?: string;
    password: string;
    student_id: number; // Student ID to create relation
    relationship: "father" | "mother" | "guardian";
  }
    
  