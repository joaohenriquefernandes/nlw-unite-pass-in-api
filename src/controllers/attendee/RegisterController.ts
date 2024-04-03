import { FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";

interface IRegisterControllerSchemaRequest extends RequestGenericInterface {
  Body: {
    name: string;
    email: string
  },
  Params: {
    eventId: string
  }
}

export function RegisterController(request: FastifyRequest<IRegisterControllerSchemaRequest>, reply: FastifyReply) {
  const { eventId } = request.params

  const { email, name } = request.body
}
