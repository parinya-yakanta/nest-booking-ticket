import {
  Collection,
  Entity,
  EntityRepositoryType,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { AccessToken } from './access-tokens.entity';
import { Partner } from './partners.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Entity({ tableName: 'users', repository: () => UserRepository })
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  password: string;

  @OneToMany(() => AccessToken, (accessToken) => accessToken.user)
  tokens = new Collection<AccessToken>(this);

  @OneToMany(() => Partner, (partner) => partner.user)
  partners = new Collection<Partner>(this);

  @Property({ onCreate: () => new Date(), nullable: true })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
