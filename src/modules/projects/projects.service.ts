import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { ProjectRepository } from 'src/repositories/project.repository';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly em: EntityManager,
  ) {}
}
