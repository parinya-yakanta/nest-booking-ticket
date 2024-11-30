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
import { Partner } from './partners.entity';
import { Min } from 'class-validator';
import { Project } from './projects.entity';
import { Booking } from './bookings.entity';
import { TicketUnitType } from 'src/enums/tickets.enum';
import { TicketRepository } from 'src/repositories/ticket.repository';

@Entity({ tableName: 'tickets', repository: () => TicketRepository })
export class Ticket {
  [EntityRepositoryType]?: TicketRepository;

  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Partner)
  partner: Partner;

  @ManyToOne(() => Project, { deleteRule: 'cascade' })
  project: Project;

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

  @Enum({
    name: 'unit_type',
    items: () => TicketUnitType,
    default: TicketUnitType.TIME,
  })
  unitType: TicketUnitType = TicketUnitType.TIME;

  @ManyToMany(() => Booking)
  bookings: Collection<Booking> = new Collection<Booking>(this);

  @Property({ onCreate: () => new Date(), nullable: true })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
