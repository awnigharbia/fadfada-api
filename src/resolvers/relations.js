export const User = {
  feedbacks(parent, args, ctx, info) {
    return ctx.prisma.user({id: parent.id}).feedbacks()
  },
  hashtags(parent, args, ctx, info) {
    return ctx.prisma.user({id: parent.id}).hashtags()
  },
  stories(parent, args, ctx, info) {
    return ctx.prisma.user({id: parent.id}).stories()
  },
}

export const Feedback = {
  sentBy(parent, args, ctx, info) {
    return ctx.prisma.feedback({id: parent.id}).sentBy()
  },
}

export const Hashtag = {
  addedBy(parent, args, ctx, info) {
    return ctx.prisma.hashtag({id: parent.id}).addedBy()
  },
  stories(parent, args, ctx, info) {
    return ctx.prisma.hashtag({id: parent.id}).stories()
  },
  followedBy(parent, args, ctx, info) {
    return ctx.prisma.hashtag({id: parent.id}).followedBy()
  },
  moderator(parent, args, ctx, info) {
    return ctx.prisma.hashtag({id: parent.id}).moderator()
  },
}

export const Story = {
  hashtags(parent, args, ctx, info) {
    return ctx.prisma.story({id: parent.id}).hashtags()
  },
  reports(parent, args, ctx, info) {
    return ctx.prisma.story({id: parent.id}).reports()
  },
  postedBy(parent, args, ctx, info) {
    return ctx.prisma.story({id: parent.id}).postedBy()
  },
  likes(parent, args, ctx, info) {
    return ctx.prisma.story({id: parent.id}).likes()
  },
  comments(parent, args, ctx, info) {
    return ctx.prisma.story({id: parent.id}).comments()
  },
  notifications(parent, args, ctx, info) {
    return ctx.prisma.story({id: parent.id}).notifications()
  },
}

export const StoryReport = {
  story(parent, args, ctx, info) {
    return ctx.prisma.storyReport({id: parent.id}).story()
  },
  reportedBy(parent, args, ctx, info) {
    return ctx.prisma.storyReport({id: parent.id}).reportedBy()
  },
}

export const Video = {
  sentBy(parent, args, ctx, info) {
    return ctx.prisma.video({id: parent.id}).sentBy()
  },
}

export const Message = {
  sentBy(parent, args, ctx, info) {
    return ctx.prisma.message({id: parent.id}).sentBy()
  },
}

export const Notification = {
  sender(parent, args, ctx, info) {
    return ctx.prisma.notification({id: parent.id}).sender()
  },
  story(parent, args, ctx, info) {
    return ctx.prisma.notification({id: parent.id}).story()
  },
}

export const Comment = {
  commentedBy(parent, args, ctx, info) {
    return ctx.prisma.comment({id: parent.id}).commentedBy()
  },
}

export const Like = {
  likedBy(parent, args, ctx, info) {
    return ctx.prisma.like({id: parent.id}).likedBy()
  },
}

export const Device = {
  account(parent, args, ctx, info) {
    return ctx.prisma.device({id: parent.id}).account()
  },
}
