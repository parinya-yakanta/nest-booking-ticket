import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from 'src/repositories/orders.repository';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository]
})
export class OrdersModule {}
