import { Collection, Entity, EntityRepositoryType, Enum, OneToMany, PrimaryKey, Property, OneToOne, Ref, ManyToOne } from '@mikro-orm/core';
import { TicketsEntity } from './tickets.entity';
import { ProjectsEntity } from './projects.entity';
import { UsersEntity } from './users.entity';
import { PartnersRepository } from 'src/repositories/partners.repository';
import { PartnerStatus, PartnerType } from 'src/enums/partners.enum';

@Entity({ tableName: 'partners', repository: () => PartnersRepository })
export class PartnersEntity {
    @PrimaryKey()
    id!: number;

    @Property({ unique: true })
    code: string;

    @Property({ nullable: true })
    logo: string;

    @Property()
    name: string;

    @Property({ type: 'text', nullable: true })
    address: string;

    @ManyToOne(() => UsersEntity)
    user: Ref<UsersEntity>;

    @OneToMany(() => TicketsEntity, ticket => ticket.partner)
    tickets = new Collection<TicketsEntity>(this);

    @OneToMany(() => ProjectsEntity, project => project.partner)
    projects = new Collection<ProjectsEntity>(this);

    @Enum({ items: () => PartnerType, default: PartnerType.CLASSIC })
    type: PartnerType = PartnerType.CLASSIC;

    @Enum({ items: () => PartnerStatus, default: PartnerStatus.ACTIVE })
    status: PartnerStatus = PartnerStatus.ACTIVE;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    [EntityRepositoryType]?: PartnersRepository;
}
