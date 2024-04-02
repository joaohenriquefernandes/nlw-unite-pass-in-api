import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "./libs/prisma";
import { generateSlug } from "./utils/GenerateSlug";

export async function routes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/events',{
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
          })
        }
      }
    } ,async (request, reply) => {
      const { details, maximumAttendees, title } = request.body

      const slug = generateSlug(title)

      const eventWithSameSlug = await prisma.event.findUnique({
        where: {
          slug
        }
      })

      if(eventWithSameSlug) {
        throw new Error('Another event with same title already exists.')
      }

      const event = await prisma.event.create({
        data: {
          title,
          slug,
          details,
          maximumAttendees
        }
      })

      return reply.status(201).send({ event })
    })
}
