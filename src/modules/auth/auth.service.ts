import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { generateAccessToken } from 'src/common/utils/token-generator';
import 'dotenv/config';
import { AccessTokenRepository } from 'src/repositories/access-token.repository';
import { CreateUserAccessTokenDto } from '../users/dto/create.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly accessTokensRepository: AccessTokenRepository,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const token = await this.createAccessToken(user.id);

      const { ...result } = user;
      return { user: result, accessToken: token };
    }

    return null;
  }

  async createAccessToken(userId: number): Promise<string> {
    const newAccessToken = generateAccessToken();

    const expiresAt = new Date();
    expiresAt.setDate(
      expiresAt.getDate() +
        parseInt(process.env.ACCESS_TOKEN_EXPIRATION_IN_DAYS, 10),
    );

    const dataUser: CreateUserAccessTokenDto = {
      userId: userId,
      token: newAccessToken,
      expiresAt: expiresAt,
    };

    const tokenEntity = this.accessTokensRepository.create(dataUser);
    return tokenEntity.token;
  }

  async validateAccessToken(token: string): Promise<boolean> {
    const accessToken = await this.accessTokensRepository.findOne({ token });

    if (!accessToken) {
      return false;
    }

    const currentDate = new Date();
    if (currentDate > accessToken.expiresAt) {
      return false;
    }

    return true;
  }

  async getUserFromAccessToken(token: string): Promise<any> {
    const accessToken = await this.accessTokensRepository.findOne(
      { token },
      { populate: ['user'] },
    );

    if (!accessToken) {
      return null;
    }

    return accessToken.user;
  }
}
