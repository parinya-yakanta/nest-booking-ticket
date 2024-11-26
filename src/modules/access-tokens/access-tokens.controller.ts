import { Controller, Get, Version } from '@nestjs/common';
import { AccessTokensService } from './access-tokens.service';

@Controller('access-tokens')
export class AccessTokensController {
  constructor(private readonly accessTokensService: AccessTokensService) {}

  @Version('1')
  @Get()
  getAccessToken() {
    return this.accessTokensService.getAccessToken();
  }
}
