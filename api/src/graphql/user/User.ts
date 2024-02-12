import { extendType, objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('email');
    t.nonNull.list.nonNull.field('entries', {
      type: 'Entry',
      resolve(parent, args, context) {
        return context.prisma.user
          .findUnique({ where: { id: parent.id } })
          .entries();
      },
    });
  },
});

export const CurrentUserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('currentUser', {
      type: 'User',
      resolve(parent, args, context, info) {
        const { userId } = context;

        if (!userId) {
          throw new Error('User not logged in');
        }

        return context.prisma.user.findUnique({ where: { id: userId } });
      },
    });
  },
});
