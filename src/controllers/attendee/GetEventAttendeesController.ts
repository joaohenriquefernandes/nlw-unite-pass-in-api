import { FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";
import { makeGetEventAttendeesService } from "../../services/factories/MakeGetEventAttendeesService";

interface IGetEventAttendeesControllerRequest extends RequestGenericInterface {
  Params: {
    eventId: string
  },
  Querystring: {
    pageIndex: number
    query: string
  }
}

export async function GetEventAttendeesController(request:FastifyRequest<IGetEventAttendeesControllerRequest>, reply: FastifyReply) {
  const { eventId } = request.params

  const { pageIndex, query } = request.query

  const getEventAttendeesService = makeGetEventAttendeesService()

  try {
    const { attendees } = await getEventAttendeesService.execute({ eventId, pageIndex, query })

    return reply.status(200).send({ attendees })
  } catch (error) {}
}
