import { randomBytes } from 'crypto';

export function generateRefreshAccessToken(): string {
  return randomBytes(18).toString('hex');
}

export function generateAccessToken(this: any): string {
  const generateRefreshAccessToken = randomBytes(18).toString('hex');
  const randomString = randomBytes(16).toString('hex');
  const accessToken = Buffer.from(
    `${randomString}:${generateRefreshAccessToken}`,
    'utf8',
  ).toString('base64');
  return accessToken;
}
