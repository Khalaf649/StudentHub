import prisma from "../../prisma";
import HomeworkFilters from "../../Interfaces/HomeworkFilter";

export async function getHomeworksService(filters: HomeworkFilters) {
  const where: any = {};

  const homeworks = await prisma.homeworks.findMany({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      start_date: true,
      due_date: true,
      full_mark: true,
      sessions: {
        select: {
          id: true,
          title: true,
          section: true,
          center_id: true,
        },
      },
    },
  });
  return homeworks;
}

export default getHomeworksService;
