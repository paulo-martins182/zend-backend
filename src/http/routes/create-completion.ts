import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../../services/create-goal'
import { createGoalCompletion } from '../../services/create-goal-completion'

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goal-completions',
    {
      schema: {
        body: z.object({ goalId: z.string() }),
      },
    },
    async req => {
      const { goalId } = req.body
      await createGoalCompletion({ goalId })
    }
  )
}
