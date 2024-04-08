import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAttendeesRepository } from "../repositories/InMemory/InMemoryAttendeesRepository";
import { InMemoryEventsRepository } from "../repositories/InMemory/InMemoryEventsRepository";
import { RegisterForEventService } from "./RegisterForEventService";
import { EmailAlreadyRegisteredError } from "./errors/EmailAlreadyRegisteredError";
import { EventNotFoundError } from "./errors/EventNotFoundError";
import { MaximumNumberReachedError } from "./errors/MaximumNumberReachedError";

let eventsRepository: InMemoryEventsRepository
let attendeesRepository: InMemoryAttendeesRepository

let sut: RegisterForEventService

describe('Register For Event Service', () => {
  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository()
    attendeesRepository = new InMemoryAttendeesRepository()

    sut = new RegisterForEventService(attendeesRepository, eventsRepository)
  })

  it('should be able to register for an event', async () => {
    const event = await eventsRepository.create({
      title: "NLW Unite",
      slug: "nlw-unite",
      maximumAttendees: 10
    })

    const { attendee } = await sut.execute({
      name: 'John Doe',
      email: "johndoe@mail.com",
      eventId: event.id
    })

    expect(attendee).toHaveProperty('id'),
    expect(attendee.id).toEqual(expect.any(Number))
  })

  it('should not be able to register for an event with duplicate email', async () => {
    const event = await eventsRepository.create({
      title: "NLW Unite",
      slug: "nlw-unite",
      maximumAttendees: 10
    })

    await sut.execute({
      name: 'John Doe',
      email: "johndoe@mail.com",
      eventId: event.id
    })

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email: "johndoe@mail.com",
        eventId: event.id
      })
    ).rejects.toBeInstanceOf(EmailAlreadyRegisteredError)
  })

  it("should not be able to register for event that don't exists", async () => {
    await eventsRepository.create({
      title: "NLW Unite",
      slug: "nlw-unite",
      maximumAttendees: 10
    })

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email: "johndoe@mail.com",
        eventId: randomUUID()
      })
    ).rejects.toBeInstanceOf(EventNotFoundError)
  })

  it("should not be able to register for an event that don't vacancies", async () => {
    const event = await eventsRepository.create({
      title: "NLW Unite",
      slug: "nlw-unite",
      maximumAttendees: 1
    })

    await sut.execute({
      name: 'John Doe',
      email: "johndoe@mail.com",
      eventId: event.id
    })

    await expect(() =>
      sut.execute({
        name: 'Rayan Dahl',
        email: "rayandahl@mail.com",
        eventId: event.id
      })
    ).rejects.toBeInstanceOf(MaximumNumberReachedError)
  })
})
