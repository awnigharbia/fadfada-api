import {getUser} from '../../utils'
import _ from 'lodash'

export const newNotificationIterator = async (parent, args, ctx, info) => {
  const {id} = await getUser(ctx)

  return await ctx.prisma.$subscribe
    .notification({
      mutation_in: ['CREATED'],
      AND: [{node: {story: {postedBy: {id: id}}}}],
    })
    .node()
}

export const newUserIterator = async (parent, args, ctx, info) => {
  return await ctx.prisma.$subscribe
    .user({
      mutation_in: ['CREATED'],
    })
    .node()
}

export const newStoryReportIterator = async (parent, args, ctx, info) => {
  return await ctx.prisma.$subscribe
    .storyReport({
      mutation_in: ['CREATED'],
    })
    .node()
}

export const newFeedbackIterator = async (parent, args, ctx, info) => {
  return await ctx.prisma.$subscribe
    .feedback({
      mutation_in: ['CREATED'],
    })
    .node()
}

export const newFollowedStoryIterator = async (parent, args, ctx, info) => {
  const {id} = await getUser(ctx)

  const hashtags = await ctx.prisma
    .user({id})
    .hashtags()
    .id()
  const ids = _.map(hashtags, x => x.id)

  return await ctx.prisma.$subscribe
    .story({
      mutation_in: ['CREATED'],
      AND: [{node: {hashtags_some: {id_in: ids}}}],
    })
    .node()
}
