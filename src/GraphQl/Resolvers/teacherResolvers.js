import getStudentsService from "../../Services/TeacherService/getStudentsService";
import getSessionsService from "../../Services/TeacherService/getSessionsService";
import getHomeworksService from "../../Services/TeacherService/getHomeworkService";
import getQuizzesService from "../../Services/TeacherService/getQuizzesService";
const teacherResolvers = {
    Query: {
        students: async (_parent, args) => {
            const filters = args.filters || {};
            return getStudentsService(filters);
        },
        sessions: async (_parent, args) => {
            const filters = args.filters || {};
            return getSessionsService(filters);
        },
        homeworks: async (_parent, args) => {
            const filters = args.filters || {};
            return getHomeworksService(filters);
        },
        quizzes: async (_parent, args) => {
            const filters = args.filters || {};
            return getQuizzesService(filters);
        },
    },
};
export default teacherResolvers;
