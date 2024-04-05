import { ICheckInsRepository } from "../repositories/interfaces/ICheckInsRepository";
import { AttendeeAlreadyCheckedInError } from "./errors/AttendeeAlreadyCheckedInError";

interface ICreateCheckInServiceRequest {
  attendeeId: number
}

export class CreateCheckInService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ attendeeId }: ICreateCheckInServiceRequest): Promise<void> {
    const attendeeCheckIn = await this.checkInsRepository.findByAttendeeId(attendeeId)

    if(attendeeCheckIn) {
      throw new AttendeeAlreadyCheckedInError()
    }

    await this.checkInsRepository.create({
      attendeeId
    })

    return
  }
}
