import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from './users.entity';
import { AccessTokenRepository } from 'src/repositories/access-token.repository';

@Entity({
  tableName: 'access_tokens',
  repository: () => AccessTokenRepository,
})
export class AccessToken {
  [EntityRepositoryType]?: AccessTokenRepository;

  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user: User;

  @Property()
  token: string;

  @Property({ type: 'datetime', name: 'expires_at', nullable: true })
  expiresAt: Date;

  @Property({ onCreate: () => new Date(), nullable: true })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
