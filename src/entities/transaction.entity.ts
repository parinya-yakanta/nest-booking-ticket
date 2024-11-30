import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Order } from './orders.entity';
import { OrderCurrency, OrderStatus } from 'src/enums/orders.enum';

@Entity({ tableName: 'transaction' })
export class Transaction {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Order, { deleteRule: 'cascade' })
  order: Order;

  @Property({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount!: number;

  @Enum({ items: () => OrderCurrency, default: OrderCurrency.THB })
  currency: OrderCurrency = OrderCurrency.THB;

  @Property({ name: 'payment_method', nullable: true })
  paymentMethod!: string;

  @Enum({ items: () => OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus = OrderStatus.PENDING;

  @Property({ onCreate: () => new Date(), nullable: true })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
