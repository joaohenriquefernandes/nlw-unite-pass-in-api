import { AttendeesRepository } from "../../repositories/AttendeesRepository";
import { EventsRepository } from "../../repositories/EventsRepository";
import { GetEventService } from "../GetEventService";

export function makeGetEventService() {
  const eventsRepository = new EventsRepository()

  const attendeesRepository = new AttendeesRepository()

  return new GetEventService(eventsRepository, attendeesRepository)
}
