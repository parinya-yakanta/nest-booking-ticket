import { Injectable } from '@nestjs/common';
import { OrdersRepository } from 'src/repositories/orders.repository';

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository) {}
}
