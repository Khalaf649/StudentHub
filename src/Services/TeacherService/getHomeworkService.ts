import prisma from "../../prisma";
import HomeworkFilters from "../../Interfaces/HomeworkFilter"; // fixed import

export async function getHomeworksService(filters: HomeworkFilters) {
  const where: any = {};

  // Apply filters
  if (filters.id) where.id = filters.id;
  if (filters.section) where.section = filters.section;
  if (filters.center_id) where.center_id = filters.center_id;

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
