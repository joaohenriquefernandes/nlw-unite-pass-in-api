import { AttendeesRepository } from "../../repositories/AttendeesRepository";
import { GetAttendeesBadgeService } from "../GetAttendeesBadgeService";

export function makeGetAttendeesBadgeService() {
  const attendeesRepository = new AttendeesRepository()

  return new GetAttendeesBadgeService(attendeesRepository)
}
