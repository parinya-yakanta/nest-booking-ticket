import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { TicketRepository } from 'src/repositories/ticket.repository';

@Injectable()
export class TicketsService {
  constructor(
    private readonly ticketsRepository: TicketRepository,
    private readonly em: EntityManager,
  ) {}
}
