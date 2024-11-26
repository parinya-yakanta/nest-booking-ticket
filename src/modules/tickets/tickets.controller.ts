import { Controller, Get, Version } from '@nestjs/common';

@Controller('tickets')
export class TicketsController {
  @Version('1')
  @Get()
  getTickets() {
    return 'tickets';
  }
}
