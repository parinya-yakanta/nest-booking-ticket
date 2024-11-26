import { Controller, Get, Version } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Version('1')
  @Get()
  getOrder() {
    return 'orders';
  }
}
