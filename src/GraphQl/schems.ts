import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Student {
    id: Int!
    name: String!
    email: String
    phone: String
    section: String
  }

  type Center {
    id: Int!
    name: String!
  }

  type Homework {
    id: Int!
    title: String!
    description: String
    start_date: String
    due_date: String
    full_mark: Int
  }

  type Quiz {
    id: Int!
    title: String!
    description: String
    full_mark: Int
  }

  type Session {
    id: Int!
    title: String!
    description: String
    session_datetime: String
    section: String
  }

  input StudentFilters {
    id: Int
    section: String
    center_id: Int
    session_id: Int
    homework_id: Int
    quiz_id: Int
  }

  input SessionFilters {
    id: Int
    section: String
    center_id: Int
  }

  input HomeworkFilters {
    id: Int
    section: String
    center_id: Int
  }

  input QuizFilters {
    id: Int
    section: String
    center_id: Int
  }

  type Query {
    students(filters: StudentFilters): [Student!]!
    sessions(filters: SessionFilters): [Session!]!
    homeworks(filters: HomeworkFilters): [Homework!]!
    quizzes(filters: QuizFilters): [Quiz!]!
  }
`;

export default typeDefs;
