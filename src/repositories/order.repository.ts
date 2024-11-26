import { EntityRepository } from '@mikro-orm/mysql';
import { Order } from 'src/entities/orders.entity';

export class OrderRepository extends EntityRepository<Order> {}
