import { EntityRepository } from "@mikro-orm/mysql";
import { TicketsEntity } from "src/entities/tickets.entity";

export class TicketsRepository extends EntityRepository<TicketsEntity> {}