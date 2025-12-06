import prisma from "../../prisma";
async function createSessionService(
  title: string,
  description: string,
  centerId: number,
  section: string,
  sessionDatetime: string
) {
  const session = await prisma.sessions.create({
    data: {
      title,
      description,
      center_id: centerId,
      section,
      session_datetime: sessionDatetime,
    },
  });
  return session;
}

export default createSessionService;
