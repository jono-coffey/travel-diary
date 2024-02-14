import {
  extendType,
  floatArg,
  intArg,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from 'nexus';

export const Trip = objectType({
  name: 'Trip',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.float('startDate');
    t.nonNull.float('endDate');
    t.field('createdBy', {
      type: 'User',
      resolve(parent, args, context) {
        return context.prisma.trip
          .findUnique({ where: { id: parent.id } })
          .createdBy();
      },
    });
    t.nonNull.list.nonNull.field('entries', {
      type: 'Entry',
      resolve(parent, args, context) {
        return context.prisma.trip
          .findUnique({ where: { id: parent.id } })
          .entries();
      },
    });
  },
});

export const TripQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('trips', {
      type: 'Trip',
      resolve(parent, args, context, info) {
        const { userId } = context;

        if (!userId) {
          throw new Error('User not logged in');
        }

        return context.prisma.trip.findMany({
          where: { createdById: userId },
        });
      },
    });
  },
});

export const GetTripQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('getTrip', {
      type: 'Trip',
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context, info) {
        const { id } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error('User not logged in');
        }

        return context.prisma.trip.findUnique({
          where: {
            id: id,
          },
        });
      },
    });
  },
});

export const TripCreateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('newTrip', {
      type: 'Trip',
      args: {
        name: nonNull(stringArg()),
        startDate: nonNull(floatArg()),
        endDate: nonNull(floatArg()),
      },
      resolve(parent, args, context) {
        const { name, startDate, endDate } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error('User not logged in');
        }

        let trip = {
          name,
          startDate,
          endDate,
          createdBy: { connect: { id: userId } },
        };

        return context.prisma.trip.create({ data: trip });
      },
    });
  },
});

export const TripDeleteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nullable.field('deleteTrip', {
      type: 'Trip',
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        const { id } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error('User not logged in');
        }

        return context.prisma.trip.delete({
          where: {
            id: id,
          },
        });
      },
    });
  },
});
