import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Center {
    id: ID!
    name: String!
  }

  type Parent {
    id: ID!
    name: String!
    phone: String!
    role: String
  }

  type Student {
    id: ID!
    name: String!
    email: String!
    phone: String
    section: String
    centers: Center
    parents: [Parent!]!
  }

  type Session {
    id: ID!
    title: String!
    description: String
    session_datetime: String!
    section: String!
    centers: Center!
  }

  type Homework {
    id: ID!
    title: String!
    description: String
    start_date: String!
    due_date: String!
    full_mark: Int!
  }

  type Quiz {
    id: ID!
    title: String!
    description: String
    full_mark: Int!
  }

  input StudentFiltersInput {
    section: String
    center_id: Int
    session_id: Int
    session_status: String
    homework_id: Int
    quiz_id: Int
  }

  input SessionFiltersInput {
    section: String
    center_id: Int
    status: String
  }

  input HomeworkFiltersInput {
    section: String
    center_id: Int
    submitted: Boolean
  }

  input QuizFiltersInput {
    section: String
    center_id: Int
  }

  type Query {
    students(filters: StudentFiltersInput): [Student!]!
    sessions(filters: SessionFiltersInput): [Session!]!
    homeworks(filters: HomeworkFiltersInput): [Homework!]!
    quizzes(filters: QuizFiltersInput): [Quiz!]!
  }
`;
