import { EventsRepository } from "../../repositories/EventsRepository";
import { CreateEventService } from "../CreateEventService";

export function makeCreateEventService() {
  const eventRepository = new EventsRepository()

  return new CreateEventService(eventRepository)
}
