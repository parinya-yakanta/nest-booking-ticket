import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import 'dotenv/config';
import { AccessTokenRepository } from 'src/repositories/access-token.repository';
import { MikroORM } from '@mikro-orm/core';
import { loginUser, validateUser } from '../users/users.interface';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private orm: MikroORM,
    private readonly usersService: UsersService,
    private readonly accessTokensRepository: AccessTokenRepository,
  ) {}

  async validateUser(email: string, pass: string): Promise<validateUser> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const em = this.orm.em.fork();
      await em.begin();
      const { token, expiresAt } = await this.usersService.createAndSaveToken(
        user,
        em,
      );

      if (!token || !expiresAt) {
        await em.rollback();
        return null;
      }

      await em.commit();

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        accessToken: token,
        expiresAt: expiresAt,
      };
    }

    return null;
  }

  async login(user: LoginDTO): Promise<loginUser> {
    const auth = await this.validateUser(user.email, user.password);

    if (!auth) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return {
      accessToken: auth.accessToken,
      expiresAt: auth.expiresAt,
    };
  }
}
