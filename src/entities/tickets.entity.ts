import { Collection, Entity, EntityRepositoryType, Enum, ManyToMany, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { PartnersEntity } from './partners.entity';
import { Min } from 'class-validator';
import { ProjectsEntity } from './projects.entity';
import { BookingsEntity } from './bookings.entity';
import { TicketsRepository } from 'src/repositories/tickets.repository';
import { TicketUnitType } from 'src/enums/tickets.enum';

@Entity({ tableName: 'tickets', repository: () => TicketsRepository })
export class TicketsEntity {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => PartnersEntity)
    partner: Ref<PartnersEntity>;

    @ManyToOne(() => ProjectsEntity)
    project: Ref<ProjectsEntity>;

    @Property()
    code: string;

    @Property()
    name: string;

    @Property()
    description: string;

    @Property()
    price: number;

    @Property()
    @Min(1)
    quantity: number;

    @Enum({ name: 'unit_type', items: () => TicketUnitType, default: TicketUnitType.TIME })
    unitType: TicketUnitType = TicketUnitType.TIME

    @ManyToMany(() => BookingsEntity)
    bookings: Collection<BookingsEntity> = new Collection<BookingsEntity>(this);

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    [EntityRepositoryType]?: TicketsRepository;
}
