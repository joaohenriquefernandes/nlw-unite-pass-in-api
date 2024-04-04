import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { RegisterController } from "./RegisterController";

export async function attendeeRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/events/:eventId/attendees',
      {
        schema: {
          params: z.object({
            eventId: z.string().uuid()
          }),
          body: z.object({
            name: z.string().min(4),
            email: z.string().email(),

          }),
          response: {
            201: z.object({
              attendee: z.object({
                id: z.number().int().positive(),
                name: z.string(),
                email: z.string().email(),
                createdAt: z.date(),
                eventId: z.string().uuid()
              })
            }),
            400: z.object({
              message: z.string()
            }),
            404: z.object({
              message: z.string()
            })
          }
        }
      },
      RegisterController
    )
}
