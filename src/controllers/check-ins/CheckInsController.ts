import { FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";
import { AttendeeAlreadyCheckedInError } from "../../services/errors/AttendeeAlreadyCheckedInError";
import { makeCreateCheckInService } from "../../services/factories/MakeCreateCheckInService";

interface ICheckInsControllerRequest extends RequestGenericInterface {
  Params: {
    attendeeId: number
  }
}

export async function CheckInsController(request: FastifyRequest<ICheckInsControllerRequest>, reply: FastifyReply) {
  const { attendeeId } = request.params

  const createCheckInService = makeCreateCheckInService()

  try {
    await createCheckInService.execute({ attendeeId })

    return reply.status(201).send()
  } catch (error) {
    if(error instanceof AttendeeAlreadyCheckedInError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
