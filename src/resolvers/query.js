import {getUser} from '../utils'

const users = (parent, args, ctx, info) => ctx.prisma.users()
const messages = (parent, args, ctx, info) => ctx.prisma.messages()
const videos = (parent, args, ctx, info) => ctx.prisma.videos()
const storyReport = (parent, args, ctx, info) => ctx.prisma.storyReports()
const hashtags = (parent, args, ctx, info) => ctx.prisma.hashtags()
const notifications = (parent, args, ctx, info) => ctx.prisma.notifications()
const story = (parent, args, ctx, info) => ctx.prisma.story()

export default {
  users,
  messages,
  videos,
  storyReport,
  hashtags,
  notifications,
  story,
}
