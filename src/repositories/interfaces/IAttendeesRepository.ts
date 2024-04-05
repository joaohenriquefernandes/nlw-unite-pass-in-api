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

export interface IFindManyByEventIdParamsResponse {
  id: number,
  name: string,
  email: string,
  createdAt: Date,
  checkIn: {
    createdAt: Date
  } | null
}

export interface IAttendeesRepository {
  create: ({ email, eventId, name }: Prisma.AttendeeUncheckedCreateInput) => Promise<Attendee>
  findByEmail: (email: string, eventId: string) => Promise<Attendee | null>
  findById: (id: number) => Promise<IFindByIdParamsResponse | null>
  findManyByEventId: (eventId: string, pageIndex: number, query?: string) => Promise<IFindManyByEventIdParamsResponse[]>
  countByEvent: (eventId: string) => Promise<number>
}
