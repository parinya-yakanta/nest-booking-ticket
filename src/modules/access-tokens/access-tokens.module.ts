import { Module } from '@nestjs/common';
import { AccessTokensService } from './access-tokens.service';
import { AccessTokensController } from './access-tokens.controller';
import { AccessTokenRepository } from 'src/repositories/access-token.repository';

@Module({
  providers: [AccessTokensService, AccessTokenRepository],
  controllers: [AccessTokensController],
  exports: [AccessTokenRepository],
})
export class AccessTokensModule {}
