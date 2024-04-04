import { AttendeesRepository } from "../../repositories/AttendeesRepository";
import { EventsRepository } from "../../repositories/EventsRepository";
import { RegisterForEventService } from "../RegisterForEventService";

export function makeRegisterForEventService() {
  const attendeesRepository = new AttendeesRepository()
  const eventsRepository = new EventsRepository()

  return new RegisterForEventService(attendeesRepository, eventsRepository)
}
