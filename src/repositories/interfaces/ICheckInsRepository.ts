import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInsRepository {
  create: ({ attendeeId }: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
  findByAttendeeId: (attendeeId: number) => Promise<CheckIn | null>
}
