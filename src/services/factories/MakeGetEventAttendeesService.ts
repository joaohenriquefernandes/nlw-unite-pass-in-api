import { AttendeesRepository } from "../../repositories/AttendeesRepository";
import { GetEventAttendeesService } from "../GetEventAttendeesService";

export function makeGetEventAttendeesService() {
  const attendeesRepository = new AttendeesRepository()

  return new GetEventAttendeesService(attendeesRepository)
}
