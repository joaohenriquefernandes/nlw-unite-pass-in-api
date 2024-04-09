import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAttendeesRepository } from "../repositories/InMemory/InMemoryAttendeesRepository";
import { GetAttendeesBadgeService } from "./GetAttendeesBadgeService";

let attendeesRepository: InMemoryAttendeesRepository
let sut: GetAttendeesBadgeService

const eventId = randomUUID()

describe('Get Attendees Badge Service', () => {
  beforeEach(async () => {
    attendeesRepository = new InMemoryAttendeesRepository()
    sut = new GetAttendeesBadgeService(attendeesRepository)

    attendeesRepository.events.push({
        id: eventId,
        title: "NLW Unite",
        slug: "nlw-unite",
        maximumAttendees: 100,
        details: "Um evento qualquer"
    })
  })

  it('should be able to get the badge information attendees', async () => {

    const {id: attendeeId} = await attendeesRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      eventId,
    })

    const { badge } = await sut.execute({
      id: attendeeId,
      baseURL: 'http://localhost:3000'
    })

    expect(badge.attendee).toHaveProperty('id')
    expect(badge.checkInURL).toEqual(expect.any(String))
  })
})
