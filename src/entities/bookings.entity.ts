import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Ticket } from './tickets.entity';
import { Partner } from './partners.entity';
import { BookingStatus } from 'src/enums/bookings.enum';
import { BookingRepository } from 'src/repositories/booking.repository';

@Entity({ tableName: 'bookings', repository: () => BookingRepository })
export class Booking {
  [EntityRepositoryType]?: BookingRepository;

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

  @ManyToOne(() => Partner)
  partner: Partner;

  @ManyToMany(() => Ticket)
  tickets: Collection<Ticket> = new Collection<Ticket>(this);

  @Property({ onCreate: () => new Date(), nullable: true })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
