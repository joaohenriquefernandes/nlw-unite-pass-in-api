import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAttendeesRepository } from "../repositories/InMemory/InMemoryAttendeesRepository";
import { InMemoryEventsRepository } from "../repositories/InMemory/InMemoryEventsRepository";
import { GetAttendeesBadgeService } from "./GetAttendeesBadgeService";

let attendeesRepository: InMemoryAttendeesRepository
let eventsRepository: InMemoryEventsRepository
let sut: GetAttendeesBadgeService

describe('Get Attendees Badge Service', () => {
  beforeEach(async () => {
    eventsRepository = new InMemoryEventsRepository()
    attendeesRepository = new InMemoryAttendeesRepository()
    sut = new GetAttendeesBadgeService(attendeesRepository)
  })

  it('should be able to get the badge information attendees', async () => {
    const { id } = await eventsRepository.create({
      title: "NLW Unite",
      slug: "nlw-unite",
      maximumAttendees: 100,
      details: "Um evento qualquer"
    })

    const {id: attendeeId} = await attendeesRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      eventId: id
    })

    const { badge } = await sut.execute({
      id: attendeeId,
      baseURL: 'http://localhost:3000'
    })

    expect(badge.attendee).toHaveProperty('id')
    expect(badge.checkInURL).toEqual(expect.any(String))
  })
})
