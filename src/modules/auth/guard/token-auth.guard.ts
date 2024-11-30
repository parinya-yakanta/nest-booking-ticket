import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { AccessTokenRepository } from 'src/repositories/access-token.repository';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly tokensRepository: AccessTokenRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header is missing or invalid',
      );
    }

    const [type, token] = authorizationHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token type or token value');
    }

    const accessToken = await this.tokensRepository.findOne({ token });

    if (!accessToken || accessToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid token or token expired');
    }

    const user = await this.usersRepository.findOne({
      id: accessToken.user.id,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.auth = user;
    request.token = token;
    return true;
  }
}
