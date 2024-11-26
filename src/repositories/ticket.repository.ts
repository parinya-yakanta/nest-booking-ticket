import { EntityRepository } from '@mikro-orm/mysql';
import { Ticket } from 'src/entities/tickets.entity';

export class TicketRepository extends EntityRepository<Ticket> {}
