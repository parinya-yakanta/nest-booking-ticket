import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({tableName: 'users', comment: 'ตารางเก็บข้อมูลผู้ใช้งาน'})
export class UserEntity {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    email!: string;

    @Property()
    password!: string;

    @Property({ default: true })
    isActive!: boolean;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}
