import { FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";
import { AttendeeNotFoundError } from "../../services/errors/AttendeeNotFoundError";
import { makeGetAttendeesBadgeService } from "../../services/factories/MakeGetAttendeesBadgeService";

interface IGetAttendeeBadgeControllerRequest extends RequestGenericInterface {
  Params: {
    id: number
  }
}

export async function GetAttendeeBadgeController(request: FastifyRequest<IGetAttendeeBadgeControllerRequest>, reply: FastifyReply) {
  const { id } = request.params

  const getAttendeeBadgeService = makeGetAttendeesBadgeService()

  try {
    const { attendee } = await getAttendeeBadgeService.execute({ id })

    return reply.status(200).send({ attendee })
  } catch (error) {
    if(error instanceof AttendeeNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}
