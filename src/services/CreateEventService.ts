import { Event } from "@prisma/client";
import { IEventsRepository } from "../repositories/interfaces/IEventsRepository";
import { generateSlug } from "../utils/GenerateSlug";
import { EventAlreadyExistsError } from "./errors/EventAlreadyExistsError";

interface ICreateEventServiceRequest {
  title: string,
  details?: string,
  maximumAttendees?: number
}

interface ICreateEventServiceResponse {
  event: Event
}

export class CreateEventService {
  constructor(private eventRepository: IEventsRepository){}

  async execute({title, details, maximumAttendees}: ICreateEventServiceRequest): Promise<ICreateEventServiceResponse> {
    const slug = generateSlug(title)

    const eventWithSameSlug = await this.eventRepository.findBySlug(slug)

    if(eventWithSameSlug) {
      throw new EventAlreadyExistsError
    }

    const event = await this.eventRepository.create({
      slug,
      title,
      details,
      maximumAttendees
    })

    return { event }
  }
}
