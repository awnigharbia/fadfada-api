import jwt from 'jsonwebtoken'
const APP_SECRET = 'mysecret123'

const getUser = ctx => {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const {userId} = jwt.verify(token, APP_SECRET)
    const where = userId
      ? {
          OR: [{id_contains: userId}],
        }
      : {}

    return ctx.prisma.users({where})
  }

  throw new Error('Not authenticated')
}

// cause context subscription is availbe in ctx.connection.context  instead of ctx.request
const getUserIdSub = context => {
  const Authorization = context.connection.context.Authorization
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const {userId} = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

export {APP_SECRET, getUser, getUserIdSub}
