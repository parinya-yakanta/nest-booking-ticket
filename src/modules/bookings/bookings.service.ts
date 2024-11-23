import { Injectable } from '@nestjs/common';
import { BookingsRepository } from 'src/repositories/bookings.repository';

@Injectable()
export class BookingsService {
    constructor(private readonly bookingsRepository: BookingsRepository) {}
}
