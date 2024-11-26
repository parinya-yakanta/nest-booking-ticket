import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TicketRepository } from 'src/repositories/ticket.repository';

@Module({
  providers: [TicketsService, TicketRepository],
  controllers: [TicketsController],
})
export class TicketsModule {}
