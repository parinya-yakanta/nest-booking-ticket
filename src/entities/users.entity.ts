import { Collection, Entity, EntityRepositoryType, OneToMany, OneToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { AccessTokensEntity } from './access-tokens.entity';
import { PartnersEntity } from './partners.entity';
import { UsersRepository } from 'src/repositories/users.repository';

@Entity({tableName: 'users', repository: () => UsersRepository})
export class UsersEntity {
    @PrimaryKey()
    id!: number;

    @Property()
    name: string;
  
    @Property()
    email: string;
  
    @Property()
    password: string;
  
    @OneToMany(() => AccessTokensEntity, accessToken => accessToken.user)
    tokens = new Collection<AccessTokensEntity>(this);

    @OneToMany(() => PartnersEntity, partner => partner.user)
    partners = new Collection<PartnersEntity>(this);

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    [EntityRepositoryType]?: UsersRepository;
}
