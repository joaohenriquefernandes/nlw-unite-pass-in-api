import { CheckIn, Prisma } from "@prisma/client";
import { ICheckInsRepository } from "../interfaces/ICheckInsRepository";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public items: CheckIn[] = []
  async create({ attendeeId }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: Math.floor(Math.random() * (10 - 0 + 1)) + 0,
      createdAt: new Date(),
      attendeeId
    }

    this.items.push(checkIn)

    return checkIn
  }

  async findByAttendeeId(attendeeId: number): Promise<CheckIn | null> {
    const checkIn = this.items.find((item) => item.attendeeId === attendeeId)

    return checkIn ?? null
  }
}
