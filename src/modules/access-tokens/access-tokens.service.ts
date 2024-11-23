import { Injectable } from '@nestjs/common';
import { AccessTokensRepository } from 'src/repositories/access-tokens.repository';

@Injectable()
export class AccessTokensService {
    constructor(private readonly accessTokensRepository: AccessTokensRepository) {}
}
