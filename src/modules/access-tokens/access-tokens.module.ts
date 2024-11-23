import { Module } from '@nestjs/common';
import { AccessTokensService } from './access-tokens.service';
import { AccessTokensController } from './access-tokens.controller';
import { AccessTokensRepository } from 'src/repositories/access-tokens.repository';

@Module({
  providers: [AccessTokensService, AccessTokensRepository],
  controllers: [AccessTokensController]
})
export class AccessTokensModule {}
