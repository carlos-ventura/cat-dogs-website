export const typeDef = `
  extend type Query {
      catFact: String
  }
`

async function fetchCatData (): Promise<String> {
  const url = 'https://catfact.ninja/fact'
  const response = await fetch(url)
  const fact = await response.json()
  return fact.fact
}

export const resolvers = {
  Query: {
    catFact: fetchCatData
  }
}
