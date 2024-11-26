import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { BookingRepository } from 'src/repositories/booking.repository';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingsRepository: BookingRepository,
    private readonly em: EntityManager,
  ) {}
}
