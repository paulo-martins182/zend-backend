import { faker } from '@faker-js/faker'

export function NameTaskGen() {
  const taskName = `${faker.hacker.verb()} the ${faker.hacker.adjective()} ${faker.hacker.noun()}`
  return taskName
}
