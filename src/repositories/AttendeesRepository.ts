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
}
