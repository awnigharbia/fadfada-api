import {GraphQLServer} from 'graphql-yoga'
import {prisma} from '../database/generated/prisma-client'
import * as Query from './resolvers/query'
import * as Mutation from './resolvers/mutation'
import * as Subscription from './resolvers/subscriptions/resolve'

import {
  User,
  Feedback,
  Hashtag,
  Story,
  StoryReport,
  Video,
  Message,
  Like,
  Device,
  Notification,
  Comment,
} from './resolvers/relations'
import AuthPayload from './resolvers/AuthPayload'
import {isAdmin} from './resolvers/middleware'

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Feedback,
  Hashtag,
  Story,
  Device,
  StoryReport,
  Video,
  Message,
  Comment,
  Like,
  Notification,
  AuthPayload,
}

const permissions = {
  Query: {
    users: isAdmin,
    // messages: isAdmin,
    storyReport: isAdmin,
    feedbacks: isAdmin,
  },
  Mutation: {
    // createVideo: isAdmin,
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
