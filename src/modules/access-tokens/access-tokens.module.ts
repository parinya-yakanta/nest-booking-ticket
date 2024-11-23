import { Module } from '@nestjs/common';
import { AccessTokensService } from './access-tokens.service';
import { AccessTokensController } from './access-tokens.controller';

@Module({
  providers: [AccessTokensService],
  controllers: [AccessTokensController]
})
export class AccessTokensModule {}
