import { Event, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { IEventsRepository } from "../interfaces/IEventsRepository";

export class InMemoryEventsRepository implements IEventsRepository {
  public items: Event[] = []
  async create({ id, slug, title, details, maximumAttendees }: Prisma.EventUncheckedCreateInput): Promise<Event> {
    const event = {
      id: id || randomUUID(),
      title,
      details: details ?? null,
      slug,
      maximumAttendees: maximumAttendees ?? null
    }

    this.items.push(event)

    return event
  }

  async findById(id: string): Promise<Event | null> {
    const event = this.items.find((item) => item.id === id)

    return event ?? null
  }

  async findBySlug(slug: string): Promise<Event | null> {
    const event = this.items.find((item) => item.slug === slug)

    return event ?? null
  }
}
