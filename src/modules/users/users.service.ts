import { Transactional } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserDto, CreateUserAccessTokenDto } from './dto/create.dto';
import { generateAccessToken } from 'src/common/utils/token-generator';
import 'dotenv/config';
import { AccessTokenRepository } from 'src/repositories/access-token.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly tokensRepository: AccessTokenRepository,
  ) {
    console.log('UsersService usersRepository: ', usersRepository);
    console.log('UsersService tokensRepository: ', tokensRepository);
  }

  async findOneById(id: number) {
    return this.usersRepository.findOne({ id });
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  @Transactional()
  async registerUser(data: CreateUserDto) {
    console.log('usersRepository:', this.usersRepository);
    console.log('Creating user with data:', data);
    try {
      const user = this.usersRepository.create(data);
      console.log('Created user:', user);
      const token = this.createAccessToken(user.id);

      return { user, token };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('User registration failed: ' + error.message);
      } else {
        throw new Error('User registration failed');
      }
    }
  }

  private async createAccessToken(userId: number): Promise<string> {
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

    const tokenEntity = this.tokensRepository.create(dataUser);
    return tokenEntity.token;
  }
}
