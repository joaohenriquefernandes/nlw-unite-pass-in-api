import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryEventsRepository } from '../repositories/InMemory/InMemoryEventsRepository'
import { CreateEventService } from './CreateEventService'
import { EventAlreadyExistsError } from './errors/EventAlreadyExistsError'

let eventsRepository: InMemoryEventsRepository
let sut: CreateEventService

describe('Create Event Service', () => {
  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository()
    sut = new CreateEventService(eventsRepository)
  })

  it('should be able to create a new event', async () => {
    const { event } = await sut.execute({
      title: 'NLW Unite Rocketseat',
      details: 'Um evento gratuito',
      maximumAttendees: 100
    })

    expect(event).toHaveProperty('id')
    expect(event.id).toEqual(expect.any(String))
  })

  it('should not be able to create a event with same name', async () => {
    const { event } = await sut.execute({
      title: 'NLW Unite Rocketseat',
      details: 'Um evento gratuito',
      maximumAttendees: 100
    })

    await expect(() =>
      sut.execute({
        title: 'NLW Unite Rocketseat',
      details: 'Segundo evento',
      maximumAttendees: 10
      })
    ).rejects.toBeInstanceOf(EventAlreadyExistsError)
  })
})
