import { drizzle } from 'drizzle-orm/postgres-js'
import postgress from 'postgres'
import * as schema from './schema'
import { env } from '../env'

export const client = postgress(env.DATABASE_URL)
export const db = drizzle(client, { schema, logger: true })
