import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAttendeesRepository } from "../repositories/InMemory/InMemoryAttendeesRepository";
import { InMemoryEventsRepository } from "../repositories/InMemory/InMemoryEventsRepository";
import { GetEventService } from "./GetEventService";
import { EventNotFoundError } from "./errors/EventNotFoundError";

let attendeesRepository: InMemoryAttendeesRepository
let eventsRepository: InMemoryEventsRepository

let sut: GetEventService

describe('Get Event Service', () => {
  beforeEach(() => {
    attendeesRepository = new InMemoryAttendeesRepository()
    eventsRepository = new InMemoryEventsRepository()

    sut = new GetEventService(eventsRepository, attendeesRepository)
  })

  it('should be able to get information from an event', async () => {
    const { id } = await eventsRepository.create({
      title: "NLW Unite",
      slug: "nlw-unite",
      maximumAttendees: 9
    })

    const { event, attendeesAmount } = await sut.execute({ id })

    expect(event).toHaveProperty('id')
    expect(event.id).toEqual(expect.any(String))
    expect(attendeesAmount).toEqual(expect.any(Number))
  })

  it("should not be able to register for an event that don't exists", async () => {
    await eventsRepository.create({
      title: "NLW Unite",
      slug: "nlw-unite",
      maximumAttendees: 9
    })

    await expect(() =>
      sut.execute({
        id: randomUUID()
      })
    ).rejects.toBeInstanceOf(EventNotFoundError)
  })
})
