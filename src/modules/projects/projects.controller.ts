import { Controller, Get, Version } from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
    @Version('1')
    @Get()
    getProjects() {
        return 'projects';
    }
}
