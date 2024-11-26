import { EntityRepository } from '@mikro-orm/mysql';
import { AccessToken } from 'src/entities/access-tokens.entity';

export class AccessTokenRepository extends EntityRepository<AccessToken> {}
