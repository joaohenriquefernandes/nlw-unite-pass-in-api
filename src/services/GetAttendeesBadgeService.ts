import { AttendeesRepository } from "../repositories/AttendeesRepository";
import { IFindByIdParamsResponse } from "../repositories/interfaces/IAttendeesRepository";
import { AttendeeNotFoundError } from "./errors/AttendeeNotFoundError";

interface IGetAttendeesBadgeServiceRequest {
  id: number
  baseURL: string
}

interface IGetAttendeesBadgeServiceResponse {
  badge:{
    attendee: IFindByIdParamsResponse
    checkInURL: string
  }
}

export class GetAttendeesBadgeService {
  constructor(private attendeesRepository: AttendeesRepository){}

  async execute({ id, baseURL }: IGetAttendeesBadgeServiceRequest): Promise<IGetAttendeesBadgeServiceResponse> {
    const attendee = await this.attendeesRepository.findById(id)

    if(!attendee) {
      throw new AttendeeNotFoundError()
    }

    const checkInURL = new URL(`/attendees/${attendee.id}/check-in`, baseURL)

    const badge = {
      attendee,
      checkInURL: checkInURL.toString()
    }

    return { badge }
  }
}
