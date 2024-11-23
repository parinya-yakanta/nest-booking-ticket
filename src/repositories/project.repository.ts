import { EntityRepository } from "@mikro-orm/mysql";
import { ProjectsEntity } from "src/entities/projects.entity";


export class ProjectRepository extends EntityRepository<ProjectsEntity> {}