import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/repositories/order.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrderRepository,
    private readonly em: EntityManager,
  ) {}
}
