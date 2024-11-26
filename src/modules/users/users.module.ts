import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { AccessTokenRepository } from 'src/repositories/access-token.repository';
import { getRepositoryToken, MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/entities/users.entity';
import { AccessToken } from 'src/entities/access-tokens.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User, AccessToken])],
  providers: [
    UsersService,
    {
      provide: getRepositoryToken(User),
      useClass: UserRepository,
    },
    {
      provide: getRepositoryToken(AccessToken),
      useClass: AccessTokenRepository,
    },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
