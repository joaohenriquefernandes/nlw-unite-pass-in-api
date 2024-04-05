import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { CheckInsController } from "./CheckInsController";

export async function checkInsRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get(
      '/attendees/:attendeeId/check-in',
      {
        schema: {
          params: z.object({
            attendeeId: z.coerce.number().int().positive()
          }),
          response: {
            201: z.void(),
            400: z.object({
              message: z.string()
            })
          }
        }
      },
      CheckInsController
    )
}
