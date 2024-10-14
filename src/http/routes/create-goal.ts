import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../../services/create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number(),
        }),
      },
    },
    async req => {
      const { title, desiredWeeklyFrequency } = req.body

      await createGoal({
        title,
        desiredWeeklyFrequency,
      })
    }
  )
}
