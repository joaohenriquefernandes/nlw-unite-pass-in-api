import { IAttendeesRepository, IFindManyByEventIdParamsResponse } from "../repositories/interfaces/IAttendeesRepository";

interface IGetEventAttendeesServiceRequest {
  eventId: string
  pageIndex: number,
  query?: string
}

interface IGetEventAttendeesServiceResponse {
  attendees: IFindManyByEventIdParamsResponse[]
}

export class GetEventAttendeesService {
  constructor(private attendeesRepository: IAttendeesRepository) {}

  async execute({ eventId, pageIndex = 0, query }: IGetEventAttendeesServiceRequest): Promise<IGetEventAttendeesServiceResponse> {
    const attendees = await this.attendeesRepository.findManyByEventId(eventId, pageIndex, query)

    return { attendees }
  }
}
