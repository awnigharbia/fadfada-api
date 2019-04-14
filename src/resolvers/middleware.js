import {getUser} from '../utils'

const isAdmin = async (resolve, parent, args, ctx, info) => {
  const [user] = await getUser(ctx)
  if (user.role !== 'ADMIN') {
    throw new Error('You dont have permissions to access this data')
  }

  return resolve()
}

export {isAdmin}
