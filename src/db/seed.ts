import { faker } from '@faker-js/faker'
import { client, db } from '.'
import { NameTaskGen } from '../utils/taskGen'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

const tasksGen = Array.from({ length: 5 }, () => {
  return {
    desiredWeeklyFrequency: faker.number.int({ min: 1, max: 7 }),
    title: NameTaskGen(),
  }
})

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db.insert(goals).values(tasksGen).returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, completedAt: startOfWeek.toDate() },
    { goalId: result[1].id, completedAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => client.end())
