import { merge } from 'lodash'
import { ApolloServer } from 'apollo-server'
import { typeDef as cat, resolvers as catResolvers } from './cat'
import { typeDef as dog, resolvers as dogResolvers } from './dog'

const Query = `
  type Query {
    _empty: String
  }
`

const resolvers = {}

export const server = new ApolloServer({
  typeDefs: [Query, cat, dog],
  resolvers: merge(resolvers, catResolvers, dogResolvers)
})
