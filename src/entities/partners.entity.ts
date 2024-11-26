import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  OneToMany,
  PrimaryKey,
  Property,
  ManyToOne,
} from '@mikro-orm/core';
import { Ticket } from './tickets.entity';
import { Project } from './projects.entity';
import { User } from './users.entity';
import { PartnerStatus, PartnerType } from 'src/enums/partners.enum';
import { PartnerRepository } from 'src/repositories/partner.repository';

@Entity({ tableName: 'partners', repository: () => PartnerRepository })
export class Partner {
  [EntityRepositoryType]?: PartnerRepository;

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

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Ticket, (ticket) => ticket.partner)
  tickets = new Collection<Ticket>(this);

  @OneToMany(() => Project, (project) => project.partner)
  projects = new Collection<Project>(this);

  @Enum({ items: () => PartnerType, default: PartnerType.CLASSIC })
  type: PartnerType = PartnerType.CLASSIC;

  @Enum({ items: () => PartnerStatus, default: PartnerStatus.ACTIVE })
  status: PartnerStatus = PartnerStatus.ACTIVE;

  @Property({ onCreate: () => new Date(), nullable: true })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
