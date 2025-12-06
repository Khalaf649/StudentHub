import getStudentsService from "../../Services/TeacherService/getStudentsService";

const teacherResolvers = {
  Query: {
    students: async (_parent: any, args: any) => {
      const filters = args.filters || {};
      return getStudentsService(filters);
    },
  },
};

export default teacherResolvers;
