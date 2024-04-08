import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/InMemory/InMemoryCheckInsRepository";
import { CreateCheckInService } from "./CreateCheckInService";
import { AttendeeAlreadyCheckedInError } from "./errors/AttendeeAlreadyCheckedInError";

describe('Create Check In Service', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: CreateCheckInService

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CreateCheckInService(checkInsRepository)
  })

  it('should be able to create a new check-in in an event', async () => {
    await expect(
      sut.execute({
        attendeeId: 1
      })
    ).resolves.toBeUndefined()
  })

  it('should not be ableto create check-in twice in the same event', async ()=> {
    await sut.execute({
      attendeeId: 1
    })

    await expect(
      sut.execute({
        attendeeId: 1
      })
    ).rejects.toBeInstanceOf(AttendeeAlreadyCheckedInError)
  })
})
