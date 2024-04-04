import { Event, Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";
import { IEventsRepository } from "./interfaces/IEventsRepository";

export class EventsRepository implements IEventsRepository {
  async create({ slug, title, details, maximumAttendees }: Prisma.EventUncheckedCreateInput): Promise<Event> {
    const event = await prisma.event.create({
      data: {
        slug,
        title,
        details: details || null,
        maximumAttendees: maximumAttendees || null
      }
    })

    return event
  }

  async findBySlug(slug: string): Promise<Event | null> {
    const event = await prisma.event.findUnique({
      where: {
        slug
      }
    })

    return event
  }

  async findById(id: string): Promise<Event | null> {
    const event = await prisma.event.findUnique({
      where: {
        id
      }
    })

    return event
  }
}
