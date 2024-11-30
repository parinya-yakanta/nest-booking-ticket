import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Partner } from './partners.entity';
import { Ticket } from './tickets.entity';
import { ProjectStatus } from 'src/enums/projects.enum';
import { ProjectRepository } from 'src/repositories/project.repository';

@Entity({ tableName: 'projects', repository: () => ProjectRepository })
export class Project {
  [EntityRepositoryType]?: ProjectRepository;

  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  code: string;

  @ManyToOne(() => Partner, { deleteRule: 'cascade' })
  partner: Partner;

  @OneToMany(() => Ticket, (ticket) => ticket.project)
  tickets = new Collection<Ticket>(this);

  @Property()
  name: string;

  @Property({ type: 'text', nullable: true })
  description: string;

  @Property({ type: 'text', nullable: true })
  logo: string;

  @Enum({ items: () => ProjectStatus, default: ProjectStatus.IN_PROGRESS })
  status: ProjectStatus = ProjectStatus.IN_PROGRESS;

  @Property({ type: 'datetime', name: 'start_at', nullable: true })
  startAt: Date;

  @Property({ type: 'datetime', name: 'end_at', nullable: true })
  endAt: Date;

  @Property({ onCreate: () => new Date(), nullable: true })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
