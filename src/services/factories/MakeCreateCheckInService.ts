import { CheckInsRepository } from "../../repositories/CheckInsRepository";
import { CreateCheckInService } from "../CreateCheckInService";

export function makeCreateCheckInService() {
  const checkInsRepository = new CheckInsRepository()

  return new CreateCheckInService(checkInsRepository)
}
