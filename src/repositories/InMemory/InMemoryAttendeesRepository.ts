import { Attendee, CheckIn, Event, Prisma } from "@prisma/client";
import { IAttendeesRepository, IFindByIdParamsResponse, IFindManyByEventIdParamsResponse } from "../interfaces/IAttendeesRepository";

export class InMemoryAttendeesRepository implements IAttendeesRepository{
  public items: Attendee[] = []
  public events: Event[] = []
  public checkIns: CheckIn[] = []

  async create({ id, email, eventId, name }: Prisma.AttendeeUncheckedCreateInput): Promise<Attendee> {
    const attendee = {
      id: id || Math.floor(Math.random() * (10 - 0 + 1)) + 0,
      name,
      email,
      createdAt: new Date(),
      eventId
    }

    this.items.push(attendee)

    return attendee
  }

  async findByEmail(email: string, eventId: string): Promise<Attendee | null> {
    const attendee = this.items.find((item) => {
      return (item.eventId === eventId && item.email === email)
    })

    return attendee ?? null
  }

  async findById(id: number): Promise<IFindByIdParamsResponse | null> {
    const data = this.items.find((item) => item.id === id)

    if(!data) {
      return null
    }

    const eventData = this.events.find((item) => item.id === data.eventId)

    return {
      ...data,
      event: {
        title: eventData!.title
      }
    }
  }

  async findManyByEventId(eventId: string, pageIndex: number, query?: string | undefined): Promise<IFindManyByEventIdParamsResponse[]> {
    const data = this.items.filter((item) => item.eventId === eventId)

    const checkIns = data.map((item) => {
      const checkIn = this.checkIns.find((checkIn) => checkIn.attendeeId === item.id)

      return {
        id: item.id,
        name: item.name,
        email: item.email,
        createdAt: item.createdAt,
        checkIn: checkIn?.createdAt
          ? {
              createdAt: checkIn.createdAt
            }
          : null
      }
    })

    return checkIns
  }

  async countByEvent(eventId: string): Promise<number> {
    const quantity = this.items.filter((item) => item.eventId === eventId).length

    return quantity
  }
}
