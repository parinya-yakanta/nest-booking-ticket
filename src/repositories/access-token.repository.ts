import { EntityRepository } from '@mikro-orm/mysql';
import { AccessToken } from 'src/entities/access-tokens.entity';

export class AccessTokenRepository extends EntityRepository<AccessToken> {
  async removeExpiredAccessTokens() {
    return await this.nativeDelete({ expiresAt: { $lt: new Date() } });
  }
}
