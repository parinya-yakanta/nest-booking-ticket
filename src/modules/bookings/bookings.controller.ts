import { Controller, Get, Version } from '@nestjs/common';

@Controller('bookings')
export class BookingsController {
  @Version('1')
  @Get()
  getBooking() {
    return 'bookings';
  }
}
