import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserDTO } from './dto/create.dto';
import { generateAccessToken } from 'src/common/utils/token-generator';
import 'dotenv/config';
import { AccessTokenRepository } from 'src/repositories/access-token.repository';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { registerUser } from './users.interface';
import { User } from 'src/entities/users.entity';

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

  async registerUser(data: CreateUserDTO): Promise<registerUser> {
    const userExists = await this.findOneByEmail(data.email);

    if (userExists) {
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const em = this.orm.em.fork();
    await em.begin();
    try {
      const { password, ...userData } = data;
      if (!password) {
        throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
      }
      const hashedPassword: string = await bcrypt.hash(password, 10);
      const dataUser = { ...userData, password: hashedPassword };
      const user = this.usersRepository.create(dataUser);
      await em.persistAndFlush(user);

      if (!user) {
        throw new HttpException(
          'User creation failed',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const { token, expiresAt } = await this.createAndSaveToken(user, em);

      await em.commit();

      return {
        status: true,
        message: 'User registered successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: token,
        expiresAt: expiresAt,
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

  async createAndSaveToken(
    user: User,
    em: EntityManager,
  ): Promise<{ token: string; expiresAt: Date }> {
    try {
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

      return { token: newAccessToken, expiresAt };
    } catch (error) {
      console.error('Error during token creation:', error);
      await em.rollback();
      throw new HttpException(
        'Token creation failed: ' + (error as any).message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
