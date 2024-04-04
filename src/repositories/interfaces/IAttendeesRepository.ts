import { Attendee, Prisma } from "@prisma/client";

export interface IAttendeesRepository {
  create: ({ email, eventId, name }: Prisma.AttendeeUncheckedCreateInput) => Promise<Attendee>
  findByEmail: (email: string, eventId: string) => Promise<Attendee | null>
  countByEvent: (eventId: string) => Promise<number>
}
