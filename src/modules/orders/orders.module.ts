import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderRepository } from 'src/repositories/order.repository';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
