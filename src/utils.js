import jwt from 'jsonwebtoken'
const APP_SECRET = 'mysecret123'

const getUser = ctx => {
  const Authorization =
    ctx.request !== undefined
      ? ctx.request.get('Authorization')
      : ctx.connection.context.authToken

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const {userId} = jwt.verify(token, APP_SECRET)
    const where = userId || null

    return ctx.prisma.user({id: where})
  }

  throw new Error('Not authenticated')
}

export {APP_SECRET, getUser}
