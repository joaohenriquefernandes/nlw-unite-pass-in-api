import { Attendee } from "@prisma/client";
import { IAttendeesRepository } from "../repositories/interfaces/IAttendeesRepository";

interface IRegisterForEventServiceRequest {
  name: string;
  email: string;
  eventId: string;
}

interface IRegisterForEventServiceResponse {
  attendee: Attendee
}

export class RegisterForEventService {
  constructor(private attendeesRepository: IAttendeesRepository) {}

  async execute({email, eventId, name}: IRegisterForEventServiceRequest): Promise<IRegisterForEventServiceResponse> {
    const attendee = await this.attendeesRepository.create({
      email,
      eventId,
      name
    })

    return { attendee }
  }
}
