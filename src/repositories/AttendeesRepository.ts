import { Attendee, Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";
import { IAttendeesRepository } from "./interfaces/IAttendeesRepository";

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


}
