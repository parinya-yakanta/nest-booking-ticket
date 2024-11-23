import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TicketsRepository } from 'src/repositories/tickets.repository';

@Module({
  providers: [TicketsService, TicketsRepository],
  controllers: [TicketsController]
})
export class TicketsModule {}
