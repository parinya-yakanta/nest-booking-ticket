import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Booking } from './bookings.entity';
import { User } from './users.entity';
import { Transaction } from './transaction.entity';
import { OrderStatus } from 'src/enums/orders.enum';
import { OrderRepository } from 'src/repositories/order.repository';

@Entity({ tableName: 'orders', repository: () => OrderRepository })
export class Order {
  [EntityRepositoryType]?: OrderRepository;

  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  code: string;

  @OneToOne(() => Booking)
  booking: Booking;

  @OneToOne(() => User)
  user: User;

  @Property({ nullable: true })
  description: string;

  @Property({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Property({ name: 'proof_payment', nullable: true })
  proofPayment: string;

  @OneToMany(() => Transaction, (transaction) => transaction.order)
  transactions = new Collection<Transaction>(this);

  @Enum({ items: () => OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus = OrderStatus.PENDING;

  @Property({ onCreate: () => new Date(), nullable: true })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
