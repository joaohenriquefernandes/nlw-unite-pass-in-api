import { FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";
import { EmailAlreadyRegisteredError } from "../../services/errors/EmailAlreadyRegisteredError";
import { EventNotFoundError } from "../../services/errors/EventNotFoundError";
import { MaximumNumberReachedError } from "../../services/errors/MaximumNumberReachedError";
import { makeRegisterForEventService } from "../../services/factories/MakeRegisterForEventService";

interface IRegisterControllerSchemaRequest extends RequestGenericInterface {
  Body: {
    name: string;
    email: string
  },
  Params: {
    eventId: string
  }
}

export async function RegisterController(request: FastifyRequest<IRegisterControllerSchemaRequest>, reply: FastifyReply) {
  const { eventId } = request.params

  const { email, name } = request.body

  const registerForEventService = makeRegisterForEventService()

  try {
    const { attendee } = await registerForEventService.execute({
      email,
      eventId,
      name
    })

    return reply.status(201).send({ attendee })
  } catch (error) {
    if(error instanceof EmailAlreadyRegisteredError || error instanceof MaximumNumberReachedError) {
      return reply.status(400).send({ message: error.message })
    }

    if(error instanceof EventNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }


}
