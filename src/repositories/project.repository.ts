import { EntityRepository } from '@mikro-orm/mysql';
import { Project } from 'src/entities/projects.entity';

export class ProjectRepository extends EntityRepository<Project> {}
