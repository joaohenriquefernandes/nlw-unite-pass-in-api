import { CheckIn, Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";
import { ICheckInsRepository } from "./interfaces/ICheckInsRepository";

export class CheckInsRepository implements ICheckInsRepository {
  async create({ attendeeId }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data: {
        attendeeId
      }
    })

    return checkIn
  }
  async findByAttendeeId(attendeeId: number): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        attendeeId
      }
    })

    return checkIn
  }

}
