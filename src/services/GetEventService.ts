import { Event } from "@prisma/client";
import { IAttendeesRepository } from "../repositories/interfaces/IAttendeesRepository";
import { IEventsRepository } from "../repositories/interfaces/IEventsRepository";
import { EventNotFoundError } from "./errors/EventNotFoundError";

interface IGetEventRequest {
  id: string;
}

interface IGetEventResponse {
  event: Event;
  attendeesAmount: number;

}

export class GetEventService {
  constructor(
    private eventsRepository: IEventsRepository,
    private attendeesRepository: IAttendeesRepository
  ) {}

  async execute({ id }: IGetEventRequest): Promise<IGetEventResponse> {
    const [event, attendeesAmount] = await Promise.all([
      this.eventsRepository.findById(id),
      this.attendeesRepository.countByEvent(id)
    ])

    if(!event) {
      throw new EventNotFoundError()
    }

    return { event, attendeesAmount }
  }
}
