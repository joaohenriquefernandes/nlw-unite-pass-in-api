import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { CreateController } from "./CreateController";

export async function eventRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/events',
      {
        schema: {
          body: z.object({
            title: z.string().min(4),
            details: z.string().nullable(),
            maximumAttendees: z.number().int().positive().nullable()
          }),
          response: {
            201: z.object({
              event: z.object({
                id: z.string().uuid(),
                title: z.string().min(4),
                details: z.string().nullable(),
                maximumAttendees: z.number().int().positive().nullable()
              })
            }),
            400: z.object({
              message: z.string()
            })
          }
        },
      },
      CreateController
    )
}
