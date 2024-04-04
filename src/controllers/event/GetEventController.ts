import { FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";
import { EventNotFoundError } from "../../services/errors/EventNotFoundError";
import { makeGetEventService } from "../../services/factories/MakeGetEventService";

interface IGetEventControllerRequest extends RequestGenericInterface {
  Params: {
    id: string;
  }
}

export async function GetEventController(request: FastifyRequest<IGetEventControllerRequest>, reply: FastifyReply) {
  const { id } = request.params

  const getEventService = makeGetEventService()

  try {
    const { event, attendeesAmount } = await getEventService.execute({ id })

    return reply.status(200).send({ event, attendeesAmount })
  } catch (error) {
    if(error instanceof EventNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}
