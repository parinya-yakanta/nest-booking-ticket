import { Injectable } from '@nestjs/common';
import { AccessTokenRepository } from 'src/repositories/access-token.repository';

@Injectable()
export class AccessTokensService {
  constructor(private readonly accessTokensRepository: AccessTokenRepository) {}

  async getAccessToken() {
    return this.accessTokensRepository.findAll();
  }
}
