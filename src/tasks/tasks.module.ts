import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AccessToken } from 'src/entities/access-tokens.entity';

@Module({
  imports: [MikroOrmModule.forFeature([AccessToken])],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
