import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAttendeesRepository } from "../repositories/InMemory/InMemoryAttendeesRepository";
import { GetEventAttendeesService } from "./GetEventAttendeesService";

let attendeesRepository: InMemoryAttendeesRepository
let sut: GetEventAttendeesService

const eventId = randomUUID()

describe('Get Event Attendees Service', () => {
  beforeEach(async () => {
    attendeesRepository = new InMemoryAttendeesRepository()
    sut = new GetEventAttendeesService(attendeesRepository)

    await attendeesRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      eventId
    })

    await attendeesRepository.create({
      name: 'Rayan Dahl',
      email: 'rayandahl@mail.com',
      eventId
    })
  })

  it('should be able to get event attendees', async () => {
    const { attendees } = await sut.execute({
      eventId,
      pageIndex: 0
    })

    expect(attendees).toHaveLength(2)
    expect(attendees).toEqual([expect.objectContaining({ name: 'John Doe' }), expect.objectContaining({ name: 'Rayan Dahl' })])
  })
})
