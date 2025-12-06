import prisma from "../../prisma";

import SessionFilters from "../../Interfaces/SessionFilters";

export async function getSessionsService(filters: SessionFilters) {
  const where: any = {};

  if (filters.section) where.section = filters.section;
  if (filters.center_id) where.center_id = filters.center_id;

  const sessions = await prisma.sessions.findMany({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      session_datetime: true,
      section: true,
      centers: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return sessions;
}

export default getSessionsService;
