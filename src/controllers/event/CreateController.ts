import { FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";
import { EventAlreadyExistsError } from "../../services/errors/EventAlreadyExistsError";
import { makeCreateEventService } from "../../services/factories/MakeCreateEventService";

interface ICreateControllerBodySchemaRequest extends RequestGenericInterface {
  Body: {
    details: string
    maximumAttendees: number
    title: string
  }
}

export async function CreateController(request: FastifyRequest<ICreateControllerBodySchemaRequest>, reply: FastifyReply) {
  const { details , maximumAttendees, title } = request.body

  const createEventService = makeCreateEventService()

  try {

    const { event } = await createEventService.execute({
      title,
      details,
      maximumAttendees
    })

    return reply.status(201).send({ event })
  } catch (error) {
    if(error instanceof EventAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
