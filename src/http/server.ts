import fastify from 'fastify'
import { createGoal } from '../services/create-goal'
import z from 'zod'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

//cadastrar meta
// meta complete
// resumo da semana
// quais metas nao foi completa

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.post(
  '/goals',
  {
    schema: {
      body: z.object({ title: z.string(), desiredWeeklyFrequency: z.number() }),
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

app.listen({
  port: 3333,
})
