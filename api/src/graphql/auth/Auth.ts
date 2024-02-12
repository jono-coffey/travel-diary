import { objectType, extendType, nonNull, stringArg } from 'nexus';

import { signupResolver } from './signupResolver';
import { loginResolver } from './loginResolver';

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.nonNull.string('token');
    t.nonNull.field('user', {
      type: 'User',
    });
  },
});

export const AuthMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('signUp', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        return signupResolver(parent, args, context);
      },
    });
    t.nonNull.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        return loginResolver(parent, args, context);
      },
    });
  },
});
