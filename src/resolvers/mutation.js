import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {APP_SECRET, getUser} from '../utils'
import _ from 'lodash'

export async function register(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)

  const user = await context.prisma.createUser({...args, password})

  const token = jwt.sign({userId: user.id}, APP_SECRET)

  return {
    token,
    user,
  }
}

export async function login(parent, args, context, info) {
  const user = await context.prisma.user({email: args.email})
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({userId: user.id}, APP_SECRET)

  return {
    token,
    user,
  }
}

export async function sendFeedback(parent, args, ctx, info) {
  try {
    const {id} = await getUser(ctx)

    return await ctx.prisma.createFeedback({
      ...args,
      sentBy: {connect: {id: id}},
    })
  } catch (e) {
    return await ctx.prisma.createFeedback({...args})
  }
}

export async function reportStory(parent, args, ctx, info) {
  const {id} = await getUser(ctx)

  const storyReport = await ctx.prisma.createStoryReport({
    ...args,
    story: {connect: {id: args.story}},
    reportedBy: {connect: {id: id}},
  })

  return storyReport ? {isReported: true} : {isReported: false}
}

export async function createStory(parent, args, ctx, info) {
  const {id} = await getUser(ctx)

  return await ctx.prisma.createStory({
    ...args,
    hashtags: {connect: args.hashtags},
    postedBy: {connect: {id: id}},
  })
}

export async function createHashtag(parent, args, ctx, info) {
  const {id} = await getUser(ctx)

  return args.isModerator
    ? await ctx.prisma.createHashtag({
        title: args.title,
        addedBy: {connect: {id: id}},
        moderator: {connect: {id: id}},
      })
    : await ctx.prisma.createHashtag({
        title: args.title,
        addedBy: {connect: {id: id}},
      })
}

export async function createVideo(parent, args, ctx, info) {
  const {id} = await getUser(ctx)

  return await ctx.prisma.createVideo({
    ...args,
    sentBy: {connect: {id: id}},
  })
}

export async function createMessage(parent, args, ctx, info) {
  const {id} = await getUser(ctx)

  return await ctx.prisma.createMessage({
    ...args,
    sentBy: {connect: {id: id}},
  })
}

export async function followHashtag(parent, args, ctx, info) {
  const {id} = await getUser(ctx)

  return await ctx.prisma.updateUser({
    data: {
      hashtags: {
        connect: {id: args.hashtagId},
      },
    },
    where: {id: id},
  })
}

export async function unFollowHashtag(parent, args, ctx, info) {
  const {id} = await getUser(ctx)

  return await ctx.prisma.updateUser({
    data: {
      hashtags: {
        disconnect: {id: args.hashtagId},
      },
    },
    where: {id: id},
  })
}

export async function addModerator(parent, args, ctx, info) {
  return await ctx.prisma.updateHashtag({
    data: {
      moderator: {
        connect: {id: args.moderatorId},
      },
    },
    where: {id: args.hashtagId},
  })
}

export async function sendNotification(parent, args, ctx, info) {
  const {id} = await getUser(ctx)

  return await ctx.prisma.createNotification({
    code: args.code,
    story: {connect: {id: args.storyId}},
    sender: {connect: {id: id}},
  })
}

export async function setSeenNotifications(parent, args, ctx, info) {
  const {id} = await getUser(ctx)

  return await ctx.prisma.updateManyNotifications({
    data: {
      seen: true,
    },
    where: {
      story: {postedBy: {id: id}},
      seen: false,
    },
  })
}

export async function addComment(parent, args, ctx, info) {
  const {id} = await getUser(ctx)

  return await ctx.prisma.createComment({
    story: {connect: {id: args.storyId}},
    commentedBy: {connect: {id: id}},
    body: args.body,
  })
}

export async function addLike(parent, args, ctx, info) {
  const {id} = await getUser(ctx)

  return await ctx.prisma.createLike({
    story: {connect: {id: args.storyId}},
    likedBy: {connect: {id: id}},
  })
}

export async function unLike(parent, args, ctx, info) {
  const {id} = await getUser(ctx)
  const query = `
    query storyID($filter:StoryWhereUniqueInput!){
      story(where:$filter) {
        id
        likes {
          id
          likedBy {
            id
          }
        }
      }
    }
  `
  const likedBy = await ctx.prisma.$graphql(query, {filter: {id: args.storyId}})
  const isFound = _.find(likedBy.story.likes, {likedBy: {id: id}})
  const likeId = isFound ? isFound : false
  if (isFound) await ctx.prisma.deleteLike({id: likeId.id})

  return {
    isUnliked: isFound ? true : false,
  }
}

export async function addDevice(parent, args, ctx, info) {
  const {id} = await getUser(ctx)

  return await ctx.prisma.createDevice({
    ...args,
    account: {connect: {id: id}},
  })
}

export async function deleteStory(parent, args, ctx, info) {
  const {id} = await getUser(ctx)
  const stories = await ctx.prisma.user({id}).stories()
  const isFound = _.find(stories, {id: args.storyId})
  if (isFound) await ctx.prisma.deleteStory({id: isFound.id})
  return {
    isDeleted: isFound ? true : false,
  }
}

export async function updateUser(parent, args, ctx, info) {
  const {id} = await getUser(ctx)
  const isValid = _.includes(
    ['username', 'email', 'password', 'role', 'language'],
    args.property,
  )

  if (!isValid) {
    return await ctx.prisma.user({id})
  }

  const user = await ctx.prisma.updateUser({
    data: {
      [args.property]: args.value,
    },
    where: {id: id},
  })

  return {
    isUpdated: user ? true : false,
  }
}

export const hashtag = async (parent, args, ctx, info) => {
  const where = args.filter
    ? {
        OR: [
          {title_contains: args.filter},
          {addedBy: {username_contains: args.filter}},
          {moderator_some: {username_contains: args.filter}},
        ],
      }
    : {}

  const hashtags = await ctx.prisma.hashtags({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  })

  const count = await ctx.prisma
    .hashtagsConnection({
      where,
    })
    .aggregate()
    .count()

  return {
    hashtags,
    count,
  }
}
