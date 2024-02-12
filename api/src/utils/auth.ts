import * as jwt from 'jsonwebtoken';

export const defaultSecret = 'default-secret';

export const AUTH_SECRET = process.env.AUTH_SECRET || defaultSecret;

export interface AuthTokenPayload {
  userId: number;
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new Error('No token found');
  }
  return jwt.verify(token, AUTH_SECRET) as AuthTokenPayload;
}
