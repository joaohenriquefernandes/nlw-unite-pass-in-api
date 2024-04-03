import { Event, Prisma } from "@prisma/client";

export interface IEventsRepository {
  create: ({ slug, title, details, maximumAttendees }: Prisma.EventUncheckedCreateInput) => Promise<Event>;
  findBySlug: (slug: string) => Promise<Event | null>
}
