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
    t.nonNull.float('latitude');
    t.nonNull.float('longitude');
    t.field('createdBy', {
      type: 'User',
      resolve(parent, args, context) {
        return context.prisma.entry
          .findUnique({ where: { id: parent.id } })
          .createdBy();
      },
    });
    t.nullable.field('trip', {
      type: 'Trip',
      resolve(parent, args, context) {
        return context.prisma.entry
          .findUnique({ where: { id: parent.id } })
          .trip();
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

        return context.prisma.entry.findMany({
          where: { createdById: userId },
        });
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
        latitude: nonNull(floatArg()),
        longitude: nonNull(floatArg()),
        tripId: nullable(intArg()),
      },
      resolve(parent, args, context) {
        const { description, destination, tripId, latitude, longitude } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error('User not logged in');
        }

        let entry = {
          description: description || null,
          destination,
          latitude,
          longitude,
          createdBy: { connect: { id: userId } },
        };

        if (tripId) {
          entry = {
            ...entry,
            trip: { connect: { id: tripId } },
          };
        }

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
        latitude: nullable(floatArg()),
        longitude: nullable(floatArg()),
        tripId: nullable(intArg()),
      },
      resolve(parent, args, context) {
        const { id, description, destination, tripId, latitude, longitude } =
          args;
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

        if (latitude) {
          updatedEntry = {
            ...updatedEntry,
            latitude,
          };
        }

        if (longitude) {
          updatedEntry = {
            ...updatedEntry,
            longitude,
          };
        }

        if (tripId) {
          updatedEntry = {
            ...updatedEntry,
            trip: { connect: { id: tripId } },
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
