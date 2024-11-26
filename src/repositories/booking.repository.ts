import { EntityRepository } from '@mikro-orm/mysql';
import { Booking } from 'src/entities/bookings.entity';

export class BookingRepository extends EntityRepository<Booking> {}
