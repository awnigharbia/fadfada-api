export default (root, context, info) =>
  context.prisma.user({where: {id: root.user.id}}, info)
