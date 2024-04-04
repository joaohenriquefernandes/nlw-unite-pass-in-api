import { AttendeesRepository } from "../repositories/AttendeesRepository";
import { IFindByIdParamsResponse } from "../repositories/interfaces/IAttendeesRepository";
import { AttendeeNotFoundError } from "./errors/AttendeeNotFoundError";

interface IGetAttendeesBadgeServiceRequest {
  id: number
}

interface IGetAttendeesBadgeServiceResponse {
  attendee: IFindByIdParamsResponse
}

export class GetAttendeesBadgeService {
  constructor(private attendeesRepository: AttendeesRepository){}

  async execute({ id }: IGetAttendeesBadgeServiceRequest): Promise<IGetAttendeesBadgeServiceResponse> {
    const attendee = await this.attendeesRepository.findById(id)

    if(!attendee) {
      throw new AttendeeNotFoundError()
    }

    return { attendee }
  }
}
