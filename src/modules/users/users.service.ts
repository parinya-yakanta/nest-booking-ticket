import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserDto } from './dto/create.dto';
import { generateAccessToken } from 'src/common/utils/token-generator';
import 'dotenv/config';
import { AccessTokenRepository } from 'src/repositories/access-token.repository';
import { MikroORM } from '@mikro-orm/core';
import { registerUser } from './users.interface';
import { ExternalExceptionsHandler } from '@nestjs/core/exceptions/external-exceptions-handler';

@Injectable()
export class UsersService {
  constructor(
    private orm: MikroORM,
    private readonly usersRepository: UserRepository,
    private readonly tokensRepository: AccessTokenRepository,
  ) {}

  async findOneById(id: number) {
    return this.usersRepository.findOne({ id });
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async registerUser(data: CreateUserDto): Promise<registerUser> {
    const em = this.orm.em.fork();
    const userExists = await this.findOneByEmail(data.email);

    if (userExists) {
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    try {
      await em.begin();

      const user = this.usersRepository.create(data);
      await em.persistAndFlush(user);

      if (!user) {
        await em.rollback();
        throw new HttpException(
          'User creation failed',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const newAccessToken = generateAccessToken();
      const expiresAt = new Date();
      expiresAt.setDate(
        expiresAt.getDate() +
          parseInt(process.env.ACCESS_TOKEN_EXPIRATION_IN_DAYS || '1', 10),
      );

      const dataUser = {
        user: user,
        token: newAccessToken,
        expiresAt: expiresAt,
      };

      const tokenEntity = this.tokensRepository.create(dataUser);
      await em.persistAndFlush(tokenEntity);
      if (!tokenEntity) {
        await em.rollback();
        throw new HttpException(
          'Token creation failed',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      await em.commit();

      return {
        status: true,
        message: 'User registered successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: newAccessToken,
      };
    } catch (error) {
      await em.rollback();
      console.error('Error during user registration:', error);
      throw new HttpException(
        'User registration failed: ' + (error as any).message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
