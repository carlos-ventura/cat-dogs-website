/* eslint-disable @typescript-eslint/no-var-requires */
const { ApolloServer } = require('apollo-server')
const Constant = require('./data/DogConstant')

const typeDefs = `
  type Query {
    catFact: String
    dogURL(index: Int!): String
  }
`

async function fetchCatData (): Promise<String> {
  const url = 'https://catfact.ninja/fact'
  const response = await fetch(url)
  const fact = await response.json()
  return fact.fact
}

function fetchDogData (index: number): String {
  return Constant.DOG_URLS[index]
}

const resolvers = {
  Query: {
    catFact: fetchCatData,
    dogURL: (_: unknown, { index }: { index: number }): String => {
      return fetchDogData(index)
    }
  }
}
const server = new ApolloServer({ typeDefs, resolvers })

server
  .listen({ port: 9000 })
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  .then((url: any) => console.log(`Server running at ${url.url}`))
