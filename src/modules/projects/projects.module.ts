import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectRepository } from 'src/repositories/project.repository';

@Module({
  providers: [ProjectsService, ProjectRepository],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
