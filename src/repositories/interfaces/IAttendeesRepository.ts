import { Attendee, Prisma } from "@prisma/client";

export interface IFindByIdParamsResponse {
  email: string;
  eventId: string;
  name: string;
  id: number;
  createdAt: Date;
  event: {
      title: string;
  };
}

export interface IAttendeesRepository {
  create: ({ email, eventId, name }: Prisma.AttendeeUncheckedCreateInput) => Promise<Attendee>
  findByEmail: (email: string, eventId: string) => Promise<Attendee | null>
  findById: (id: number) => Promise<IFindByIdParamsResponse | null>
  countByEvent: (eventId: string) => Promise<number>
}
