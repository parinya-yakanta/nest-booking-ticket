import { Entity, EntityRepositoryType, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { UsersEntity } from './users.entity';
import { AccessTokensRepository } from 'src/repositories/access-tokens.repository';

@Entity({ tableName: 'access_tokens', repository: () => AccessTokensRepository })
export class AccessTokensEntity {
    @PrimaryKey()
    id!: number;

    @Property()
    name: string;

    @Property()
    token: string;

    @Property({ name: 'fcm_token', nullable: true })
    fcmToken: string;

    @Property({ type: 'text', nullable: true })
    abilities: string;

    @Property({ type: 'datetime', name: 'expires_at', nullable: true })
    expiresAt: Date;

    @Property({ type: 'datetime', onCreate: () => new Date(), name: 'created_at' })
    createdAt = new Date();

    @Property({ type: 'datetime', onUpdate: () => new Date(), name: 'updated_at' })
    updatedAt = new Date();

    @ManyToOne(() => UsersEntity)
    user: Ref<UsersEntity>;

    [EntityRepositoryType]?: AccessTokensRepository;
}
