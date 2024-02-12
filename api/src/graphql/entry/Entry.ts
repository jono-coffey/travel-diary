import {
  extendType,
  floatArg,
  intArg,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from 'nexus';

export const Entry = objectType({
  name: 'Entry',
  definition(t) {
    t.nonNull.int('id');
    t.nullable.string('description');
    t.nonNull.string('destination');
    t.nonNull.float('startDate');
    t.nonNull.float('endDate');
    t.field('createdBy', {
      type: 'User',
      resolve(parent, args, context) {
        return context.prisma.entry
          .findUnique({ where: { id: parent.id } })
          .createdBy();
      },
    });
  },
});

export const EntriesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('entries', {
      type: 'Entry',
      resolve(parent, args, context, info) {
        const { userId } = context;

        if (!userId) {
          throw new Error('User not logged in');
        }

        return context.prisma.entry.findMany();
      },
    });
  },
});

export const EntryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('getEntry', {
      type: 'Entry',
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context, info) {
        const { id } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error('User not logged in');
        }

        return context.prisma.entry.findUnique({
          where: {
            id: id,
          },
        });
      },
    });
  },
});

export const EntryCreateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('newEntry', {
      type: 'Entry',
      args: {
        description: nullable(stringArg()),
        destination: nonNull(stringArg()),
        startDate: nonNull(floatArg()),
        endDate: nonNull(floatArg()),
      },
      resolve(parent, args, context) {
        const { description, destination, startDate, endDate } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error('User not logged in');
        }

        const entry = {
          description: description || null,
          destination,
          startDate,
          endDate,
          createdBy: { connect: { id: userId } },
        };

        return context.prisma.entry.create({ data: entry });
      },
    });
  },
});

export const EntryUpdateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nullable.field('updateEntry', {
      type: 'Entry',
      args: {
        id: nonNull(intArg()),
        description: nullable(stringArg()),
        destination: nullable(stringArg()),
        startDate: nullable(floatArg()),
        endDate: nullable(floatArg()),
      },
      resolve(parent, args, context) {
        const { id, description, destination, startDate, endDate } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error('User not logged in');
        }

        let updatedEntry = {};
        if (description) {
          updatedEntry = {
            ...updatedEntry,
            description,
          };
        }

        if (destination) {
          updatedEntry = {
            ...updatedEntry,
            destination,
          };
        }

        if (startDate) {
          updatedEntry = {
            ...updatedEntry,
            startDate,
          };
        }

        if (endDate) {
          updatedEntry = {
            ...updatedEntry,
            endDate,
          };
        }

        return context.prisma.entry.update({
          where: {
            id: id,
          },
          data: updatedEntry,
        });
      },
    });
  },
});

export const EntryDeleteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nullable.field('deleteEntry', {
      type: 'Entry',
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        const { id } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error('User not logged in');
        }

        return context.prisma.entry.delete({
          where: {
            id: id,
          },
        });
      },
    });
  },
});
