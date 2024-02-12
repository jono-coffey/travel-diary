import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AUTH_SECRET } from '../../utils/auth';
import { Context } from '../../context';

export const signupResolver = async (
  parent: {},
  args: { email: string; password: string },
  context: Context
) => {
  const { email, password } = args;

  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  if (user) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await context.prisma.user.create({
    data: { email, password: hashedPassword },
  });

  const token = jwt.sign({ userId: newUser.id }, AUTH_SECRET);

  return {
    token,
    user: newUser,
  };
};
