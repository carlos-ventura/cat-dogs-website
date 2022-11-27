/* eslint-disable @typescript-eslint/no-var-requires */
const { ApolloServer } = require('apollo-server')
const Constant = require('./data/DogConstant')
const mysql = require('mysql2')
const computeLib = require('./compute/compute')

const typeDefs = `
  type Query {
    catFact: String
    dogURL(inputNumber: Int!): String
  }
`

async function fetchCatData (): Promise<String> {
  const url = 'https://catfact.ninja/fact'
  const response = await fetch(url)
  const fact = await response.json()
  return fact.fact
}

async function fetchDogData (inputNumber: number): Promise<String | null> {
  const index = await computeLib.dogIndexLogic(inputNumber, connection)
  if (index === null) {
    return null
  }
  return Constant.DOG_URLS[index]
}

const resolvers = {
  Query: {
    catFact: fetchCatData,
    dogURL: async (_: unknown, { inputNumber }: { inputNumber: number }): Promise<String | null> => {
      return await fetchDogData(inputNumber)
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server
  .listen({ port: 9000, hostname: '0.0.0.0' })
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  .then((url: any) => console.log(`Server running at ${url.url}`))

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'doglogic'
})

connection.connect(function (err: { message: string }) {
  if (err !== null) {
    return console.error(err.message)
  }
  console.log('Connected to the MySQL server.')
})
