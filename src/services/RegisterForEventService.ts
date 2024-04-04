import { Attendee } from "@prisma/client";
import { IAttendeesRepository } from "../repositories/interfaces/IAttendeesRepository";
import { IEventsRepository } from "../repositories/interfaces/IEventsRepository";
import { EmailAlreadyRegisteredError } from "./errors/EmailAlreadyRegisteredError";
import { EventNotFoundError } from "./errors/EventNotFoundError";
import { MaximumNumberReachedError } from "./errors/MaximumNumberReachedError";

interface IRegisterForEventServiceRequest {
  name: string;
  email: string;
  eventId: string;
}

interface IRegisterForEventServiceResponse {
  attendee: Attendee
}

export class RegisterForEventService {
  constructor(
    private attendeesRepository: IAttendeesRepository,
    private eventsRepository: IEventsRepository
  ) {}

  async execute({email, eventId, name}: IRegisterForEventServiceRequest): Promise<IRegisterForEventServiceResponse> {
    const attendeeFromEmail = await this.attendeesRepository.findByEmail(email, eventId)

    if(attendeeFromEmail) {
      throw new EmailAlreadyRegisteredError()
    }

    const [event, amountOfAttendeesForEvent] = await Promise.all([
      this.eventsRepository.findById(eventId),
      this.attendeesRepository.countByEvent(eventId)
    ])

    if(!event) {
      throw new EventNotFoundError()
    }

    if(event?.maximumAttendees && amountOfAttendeesForEvent >= event.maximumAttendees) {
      throw new MaximumNumberReachedError()
    }

    const attendee = await this.attendeesRepository.create({
      email,
      eventId,
      name
    })

    return { attendee }
  }
}
