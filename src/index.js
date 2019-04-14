import {GraphQLServer} from 'graphql-yoga'
import {prisma} from '../database/generated/prisma-client'
import Query from './resolvers/query'
import Mutation from './resolvers/mutation'
import AuthPayload from './resolvers/AuthPayload'
import {isAdmin} from './resolvers/middleware'

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
}

const permissions = {
  Query: {
    users: isAdmin,
    messages: isAdmin,
    storyReport: isAdmin,
    feedback: isAdmin,
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma,
  }),
  middlewares: [permissions],
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
