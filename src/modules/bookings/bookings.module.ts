import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingRepository } from 'src/repositories/booking.repository';

@Module({
  providers: [BookingsService, BookingRepository],
  controllers: [BookingsController],
})
export class BookingModule {}
