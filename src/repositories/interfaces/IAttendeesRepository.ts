import { Attendee, Prisma } from "@prisma/client";

export interface IAttendeesRepository {
  create: ({ email, eventId, name }: Prisma.AttendeeUncheckedCreateInput) => Promise<Attendee>
}
