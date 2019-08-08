import {getUser} from '../utils'
import _ from 'lodash'

// return all data without restrictions
export const users = async (parent, args, ctx, info) => await ctx.prisma.users()
export const messages = async (parent, args, ctx, info) =>
  await ctx.prisma.messages()
export const videos = async (parent, args, ctx, info) =>
  await ctx.prisma.videos({last: 1})
export const storyReports = async (parent, args, ctx, info) =>
  await ctx.prisma.storyReports()
export const trending = async (parent, args, ctx, info) => {
  const query = `
    {
      hashtags {
        id
        title
        followedBy {
          id
        }
      }
    }
  `
  const {id} = await getUser(ctx)
  const myHashtags = await ctx.prisma.user({id: id}).hashtags()
  const {hashtags} = await ctx.prisma.$graphql(query)
  const filterdTags = _.filter(hashtags, x => !_.find(myHashtags, {id: x.id}))

  return _(filterdTags)
    .sortBy(['followedBy'])
    .reverse()
    .take(7)
    .value()
}
export const hashtags = async (parent, args, ctx, info) =>
  await ctx.prisma.hashtags()
export const notifications = async (parent, args, ctx, info) => {
  const {id} = await getUser(ctx)
  const where = {story: {postedBy: {id: id}}}

  const notification = await ctx.prisma.notifications({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: 'id_DESC',
  })

  const count = await ctx.prisma
    .notificationsConnection({
      where,
    })
    .aggregate()
    .count()

  return {
    notification,
    count,
  }
}

export const stories = async (parent, args, ctx, info) =>
  await ctx.prisma.stories()
export const feedbacks = async (parent, args, ctx, info) =>
  await ctx.prisma.feedbacks()

// return single data
export const user = async (parent, args, ctx, info) => {
  const where = args.filter
    ? {
        OR: [
          {email_contains: args.filter},
          {username_contains: args.filter},
          {id: args.filter},
        ],
      }
    : {}

  const users = await ctx.prisma.users({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  })

  const count = await ctx.prisma
    .usersConnection({
      where,
    })
    .aggregate()
    .count()

  return {
    users,
    count,
  }
}

export const storyWithHashtags = async (parent, args, ctx, info) => {
  const where = args.filter
    ? {
        OR: [{hashtags_some: {title_in: args.filter}}],
      }
    : {}

  const stories = ctx.prisma.stories({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  })

  const count = await ctx.prisma
    .storiesConnection({
      where,
    })
    .aggregate()
    .count()

  return {
    stories,
    count,
  }
}

export const story = async (parent, args, ctx, info) => {
  return await ctx.prisma.story({id: args.storyId})
}

export const storyReport = async (parent, args, ctx, info) => {
  const where = args.filter
    ? {
        OR: [{reason_contains: args.filter}],
      }
    : {}

  const storyReports = await ctx.prisma.storyReports({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  })

  const count = await ctx.prisma
    .storyReportsConnection({
      where,
    })
    .aggregate()
    .count()

  return {
    storyReports,
    count,
  }
}

export const device = async (parent, args, ctx, info) => {
  const where = args.filter
    ? {
        OR: [
          {browser_contains: args.filter},
          {os_contains: args.filter},
          {zip_contains: args.filter},
          {language_contains: args.filter},
          {country_contains: args.filter},
          {ip_contains: args.filter},
        ],
      }
    : {}

  const devices = await ctx.prisma.devices({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  })

  const count = await ctx.prisma
    .devicesConnection({
      where,
    })
    .aggregate()
    .count()

  return {
    devices,
    count,
  }
}

export const userInfo = async (parent, args, ctx, info) => {
  const user = await getUser(ctx)

  return user
}
