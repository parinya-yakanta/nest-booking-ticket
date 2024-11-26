import { randomBytes } from 'crypto';

export function generateRefreshAccessToken(): string {
  return randomBytes(18).toString('hex');
}

export function generateAccessToken(this: any): string {
  const randomString = randomBytes(16).toString('hex');
  const accessToken = Buffer.from(
    `${randomString}:${this.generateRefreshAccessToken()}`,
    'utf8',
  ).toString('base64');
  return accessToken;
}
