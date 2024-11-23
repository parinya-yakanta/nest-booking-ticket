import { Injectable } from '@nestjs/common';
import { TicketsRepository } from 'src/repositories/tickets.repository';

@Injectable()
export class TicketsService {
    constructor(private readonly ticketsRepository: TicketsRepository) {}
}
