import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AccessTokensModule } from '../access-tokens/access-tokens.module';
import { AccessTokenRepository } from 'src/repositories/access-token.repository';

@Module({
  imports: [UsersModule, PassportModule, AccessTokensModule],
  providers: [AuthService, LocalStrategy, AccessTokenRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
