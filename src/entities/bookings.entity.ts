import { Collection, Entity, EntityRepositoryType, Enum, ManyToMany, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { BookingStatus } from 'src/enums/bookings.enum';
import { TicketsEntity } from './tickets.entity';
import { PartnersEntity } from './partners.entity';
import { BookingsRepository } from 'src/repositories/bookings.repository';

@Entity({ tableName: 'bookings', repository: () => BookingsRepository })
export class BookingsEntity {
    @PrimaryKey()
    id!: number;

    @Property({ unique: true })
    code: string;

    @Property()
    name: string;

    @Property()
    description: string;

    @Property({ type: 'datetime', name: 'expired_at', nullable: true })
    expiredAt: Date;

    @Enum({ items: () => BookingStatus, default: BookingStatus.PENDING })
    status: BookingStatus = BookingStatus.PENDING;

    @ManyToOne(() => PartnersEntity)
    partner: Ref<PartnersEntity>;

    @ManyToMany(() => TicketsEntity)
    tickets: Collection<TicketsEntity> = new Collection<TicketsEntity>(this);

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    [EntityRepositoryType]?: BookingsRepository;
}
