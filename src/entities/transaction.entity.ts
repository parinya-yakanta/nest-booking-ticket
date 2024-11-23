import { Entity, Enum, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { OrderCurrency, OrderStatus } from 'src/enums/orders.enum';
import { OrdersEntity } from './orders.entity';

@Entity({ tableName: 'transaction' })
export class TransactionEntity {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => OrdersEntity)
    order: Ref<OrdersEntity>;
  
    @Property({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    amount!: number;
  
    @Enum({ items: () => OrderCurrency, default: OrderCurrency.THB })
    currency: OrderCurrency = OrderCurrency.THB;
  
    @Property({ name: 'payment_method', nullable: true })
    paymentMethod!: string;
  
    @Enum({ items: () => OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus = OrderStatus.PENDING;
  
    @Property({ name: 'created_at', onCreate: () => new Date() })
    createdAt: Date = new Date();
  
    @Property({ name: 'updated_at', onUpdate: () => new Date(), nullable: true })
    updatedAt?: Date;
}
