import { Collection, Entity, EntityRepositoryType, Enum, OneToMany, OneToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { BookingsEntity } from './bookings.entity';
import { UsersEntity } from './users.entity';
import { OrderStatus } from 'src/enums/orders.enum';
import { TransactionEntity } from './transaction.entity';
import { OrdersRepository } from 'src/repositories/orders.repository';

@Entity({ tableName: 'orders', repository: () => OrdersRepository })
export class OrdersEntity {
    @PrimaryKey()
    id!: number;

    @Property({ unique: true })
    code: string;

    @OneToOne(() => BookingsEntity)
    booking: Ref<BookingsEntity>;

    @OneToOne(() => UsersEntity)
    user: Ref<UsersEntity>;

    @Property({ nullable: true })
    description: string;

    @Property({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price: number;

    @Property({ name: 'proof_payment', nullable: true })
    proofPayment: string;

    @OneToMany(() => TransactionEntity, transaction => transaction.order)
    transactions = new Collection<TransactionEntity>(this);

    @Enum({ items: () => OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus = OrderStatus.PENDING;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    [EntityRepositoryType]?: OrdersRepository;
}
