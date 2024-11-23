import { Controller, Get, Version } from '@nestjs/common';

@Controller('access-tokens')
export class AccessTokensController {
    @Version('1')
    @Get()
    getAccessToken() {
        return 'access token';
    }
}
