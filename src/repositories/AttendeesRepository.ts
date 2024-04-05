import { Attendee, Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";
import { IAttendeesRepository, IFindByIdParamsResponse, IFindManyByEventIdParamsResponse } from "./interfaces/IAttendeesRepository";

export class AttendeesRepository implements IAttendeesRepository {
  async create({ email, eventId, name }: Prisma.AttendeeUncheckedCreateInput): Promise<Attendee> {
    const attendee = await prisma.attendee.create({
      data: {
        email,
        name,
        eventId
      }
    })

    return attendee
  }

  async findByEmail(email: string, eventId: string): Promise<Attendee | null> {
    const attendee = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId
        }
      }
    })

    return attendee
  }

  async countByEvent(eventId: string): Promise<number> {
    const quantity = await prisma.attendee.count({
      where: {
        eventId
      }
    })

    return quantity
  }

  async findById(id: number): Promise<IFindByIdParamsResponse | null> {
    const attendee = await prisma.attendee.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        eventId: true,
        event: {
          select: {
            title: true
          }
        }
      },
      where: {
        id
      }
    })

    return attendee
  }

  async findManyByEventId(eventId: string, pageIndex: number, query?: string): Promise<IFindManyByEventIdParamsResponse[]> {
    const attendees = await prisma.attendee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        checkIn: {
          select: {
            createdAt: true
          }
        }
      },
      where: query ? {
        eventId,
        name: {
          contains: query
        }
      } : {
        eventId
      },
      take: 10,
      skip: pageIndex * 10,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return attendees
  }
}
