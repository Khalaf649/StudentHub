import teacherResolvers from "./Resolvers/filterStudentResolvers";

export const resolvers = {
  Query: {
    ...teacherResolvers.Query,
  },
};
