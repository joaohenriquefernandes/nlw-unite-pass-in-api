import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { CreateController } from "./CreateController";
import { GetEventController } from "./GetEventController";

export async function eventRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/events',
      {
        schema: {
          summary: 'Create an event',
          tags: ['events'],
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

  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/events/:id',
    {
      schema: {
        summary: 'Get an event',
        tags: ['events'],
        params: z.object({
          id: z.string().uuid()
        }),
        response: {
          200: z.object({
            event: z.object({
              id: z.string().uuid(),
              title: z.string(),
              details: z.string().nullable(),
              slug: z.string(),
              maximumAttendees: z.number().nullable()
            }),
            attendeesAmount: z.number()
          }),
          404: z.object({
            message: z.string()
          })
        }
      }
    },
    GetEventController)
}
