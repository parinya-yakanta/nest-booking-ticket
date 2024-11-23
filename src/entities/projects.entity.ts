import { Collection, Entity, EntityRepositoryType, Enum, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { PartnersEntity } from './partners.entity';
import { TicketsEntity } from './tickets.entity';
import { ProjectStatus } from 'src/enums/projects.enum';
import { ProjectRepository } from 'src/repositories/project.repository';


@Entity({ tableName: 'projects', repository: () => ProjectRepository })
export class ProjectsEntity {
    @PrimaryKey()
    id!: number;

    @Property({ unique: true })
    code: string;

    @ManyToOne(() => PartnersEntity)
    partner: Ref<PartnersEntity>;

    @OneToMany(() => TicketsEntity, ticket => ticket.project)
    tickets = new Collection<TicketsEntity>(this);

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

    @Property({ type: 'datetime', name: 'created_at' })
    createdAt = new Date();

    @Property({ onUpdate: () => new Date(), type: 'datetime', name: 'updated_at' })
    updatedAt = new Date();

    [EntityRepositoryType]?: ProjectRepository;
}
