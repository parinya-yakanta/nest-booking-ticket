import { EntityRepository } from "@mikro-orm/mysql";
import { BookingsEntity } from "src/entities/bookings.entity";

export class BookingsRepository extends EntityRepository<BookingsEntity> {}