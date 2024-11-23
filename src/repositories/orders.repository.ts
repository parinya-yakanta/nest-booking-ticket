import { EntityRepository } from "@mikro-orm/mysql";
import { OrdersEntity } from "src/entities/orders.entity";

export class OrdersRepository extends EntityRepository<OrdersEntity> {}