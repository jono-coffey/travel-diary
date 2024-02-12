import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AUTH_SECRET } from '../../utils/auth';
import { Context } from '../../context';

export const loginResolver = async (
  parent: any,
  args: { email: string; password: string },
  context: Context
) => {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, AUTH_SECRET);

  return {
    token,
    user,
  };
};
