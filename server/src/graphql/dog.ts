import { dogUrls } from '../data/dogConstant'
import { dogIndexLogic } from '../compute/compute'
import { connection } from '../database/init'

export const typeDef = `
  extend type Query {
    dogURL(inputNumber: Int!): String
  }
`

async function fetchDogData (inputNumber: number): Promise<String | null> {
  const index = await dogIndexLogic(inputNumber, connection)
  if (index === null) {
    return null
  }
  return dogUrls[index]
}

export const resolvers = {
  Query: {
    dogURL: async (_: unknown, { inputNumber }: { inputNumber: number }): Promise<String | null> => {
      return await fetchDogData(inputNumber)
    }
  }
}
