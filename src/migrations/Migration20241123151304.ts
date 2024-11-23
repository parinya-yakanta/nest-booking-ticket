import { Migration } from '@mikro-orm/migrations';

export class Migration20241123151304 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`users\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`partners\` (\`id\` int unsigned not null auto_increment primary key, \`code\` varchar(255) not null, \`logo\` varchar(255) null, \`name\` varchar(255) not null, \`address\` text null, \`user_id\` int unsigned not null, \`type\` enum('classic', 'silver', 'gold', 'platinum') not null default 'classic', \`status\` enum('active', 'inactive', 'suspended') not null default 'active', \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`partners\` add unique \`partners_code_unique\`(\`code\`);`);
    this.addSql(`alter table \`partners\` add index \`partners_user_id_index\`(\`user_id\`);`);

    this.addSql(`create table \`projects\` (\`id\` int unsigned not null auto_increment primary key, \`code\` varchar(255) not null, \`partner_id\` int unsigned not null, \`name\` varchar(255) not null, \`description\` text null, \`logo\` text null, \`status\` enum('in_progress', 'open', 'postpone', 'close', 'cancel') not null default 'in_progress', \`start_at\` datetime null, \`end_at\` datetime null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`projects\` add unique \`projects_code_unique\`(\`code\`);`);
    this.addSql(`alter table \`projects\` add index \`projects_partner_id_index\`(\`partner_id\`);`);

    this.addSql(`create table \`tickets\` (\`id\` int unsigned not null auto_increment primary key, \`partner_id\` int unsigned not null, \`project_id\` int unsigned not null, \`code\` varchar(255) not null, \`name\` varchar(255) not null, \`description\` varchar(255) not null, \`price\` int not null, \`quantity\` int not null, \`unit_type\` enum('time', 'day', 'piece', 'set', 'pair', 'pack', 'box', 'case', 'drum', 'can', 'bottle', 'bag', 'sachet', 'bar', 'sheet', 'stick', 'glass', 'tray') not null default 'time', \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`tickets\` add index \`tickets_partner_id_index\`(\`partner_id\`);`);
    this.addSql(`alter table \`tickets\` add index \`tickets_project_id_index\`(\`project_id\`);`);

    this.addSql(`create table \`bookings\` (\`id\` int unsigned not null auto_increment primary key, \`code\` varchar(255) not null, \`name\` varchar(255) not null, \`description\` varchar(255) not null, \`expired_at\` datetime null, \`status\` enum('pending', 'confirmed', 'cancelled', 'completed') not null default 'pending', \`partner_id\` int unsigned not null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`bookings\` add unique \`bookings_code_unique\`(\`code\`);`);
    this.addSql(`alter table \`bookings\` add index \`bookings_partner_id_index\`(\`partner_id\`);`);

    this.addSql(`create table \`tickets_bookings\` (\`tickets_entity_id\` int unsigned not null, \`bookings_entity_id\` int unsigned not null, primary key (\`tickets_entity_id\`, \`bookings_entity_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`tickets_bookings\` add index \`tickets_bookings_tickets_entity_id_index\`(\`tickets_entity_id\`);`);
    this.addSql(`alter table \`tickets_bookings\` add index \`tickets_bookings_bookings_entity_id_index\`(\`bookings_entity_id\`);`);

    this.addSql(`create table \`bookings_tickets\` (\`bookings_entity_id\` int unsigned not null, \`tickets_entity_id\` int unsigned not null, primary key (\`bookings_entity_id\`, \`tickets_entity_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`bookings_tickets\` add index \`bookings_tickets_bookings_entity_id_index\`(\`bookings_entity_id\`);`);
    this.addSql(`alter table \`bookings_tickets\` add index \`bookings_tickets_tickets_entity_id_index\`(\`tickets_entity_id\`);`);

    this.addSql(`create table \`orders\` (\`id\` int unsigned not null auto_increment primary key, \`code\` varchar(255) not null, \`booking_id\` int unsigned not null, \`user_id\` int unsigned not null, \`description\` varchar(255) null, \`price\` numeric(10,2) not null default 0, \`proof_payment\` varchar(255) null, \`status\` enum('pending', 'paid', 'confirm', 'payment_failed', 'shipping', 'received', 'cancelled') not null default 'pending', \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`orders\` add unique \`orders_code_unique\`(\`code\`);`);
    this.addSql(`alter table \`orders\` add unique \`orders_booking_id_unique\`(\`booking_id\`);`);
    this.addSql(`alter table \`orders\` add unique \`orders_user_id_unique\`(\`user_id\`);`);

    this.addSql(`create table \`transaction\` (\`id\` int unsigned not null auto_increment primary key, \`order_id\` int unsigned not null, \`amount\` numeric(10,2) not null default 0, \`currency\` enum('THB', 'USD', 'EUR', 'JPY', 'CNY') not null default 'THB', \`payment_method\` varchar(255) null, \`status\` enum('pending', 'paid', 'confirm', 'payment_failed', 'shipping', 'received', 'cancelled') not null default 'pending', \`created_at\` datetime not null, \`updated_at\` datetime null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`transaction\` add index \`transaction_order_id_index\`(\`order_id\`);`);

    this.addSql(`create table \`access_tokens\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`token\` varchar(255) not null, \`fcm_token\` varchar(255) null, \`abilities\` text null, \`expires_at\` datetime null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`user_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`access_tokens\` add index \`access_tokens_user_id_index\`(\`user_id\`);`);

    this.addSql(`alter table \`partners\` add constraint \`partners_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`projects\` add constraint \`projects_partner_id_foreign\` foreign key (\`partner_id\`) references \`partners\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`tickets\` add constraint \`tickets_partner_id_foreign\` foreign key (\`partner_id\`) references \`partners\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`tickets\` add constraint \`tickets_project_id_foreign\` foreign key (\`project_id\`) references \`projects\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`bookings\` add constraint \`bookings_partner_id_foreign\` foreign key (\`partner_id\`) references \`partners\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`tickets_bookings\` add constraint \`tickets_bookings_tickets_entity_id_foreign\` foreign key (\`tickets_entity_id\`) references \`tickets\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`tickets_bookings\` add constraint \`tickets_bookings_bookings_entity_id_foreign\` foreign key (\`bookings_entity_id\`) references \`bookings\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`bookings_tickets\` add constraint \`bookings_tickets_bookings_entity_id_foreign\` foreign key (\`bookings_entity_id\`) references \`bookings\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`bookings_tickets\` add constraint \`bookings_tickets_tickets_entity_id_foreign\` foreign key (\`tickets_entity_id\`) references \`tickets\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`orders\` add constraint \`orders_booking_id_foreign\` foreign key (\`booking_id\`) references \`bookings\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`orders\` add constraint \`orders_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`transaction\` add constraint \`transaction_order_id_foreign\` foreign key (\`order_id\`) references \`orders\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`access_tokens\` add constraint \`access_tokens_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`partners\` drop foreign key \`partners_user_id_foreign\`;`);

    this.addSql(`alter table \`orders\` drop foreign key \`orders_user_id_foreign\`;`);

    this.addSql(`alter table \`access_tokens\` drop foreign key \`access_tokens_user_id_foreign\`;`);

    this.addSql(`alter table \`projects\` drop foreign key \`projects_partner_id_foreign\`;`);

    this.addSql(`alter table \`tickets\` drop foreign key \`tickets_partner_id_foreign\`;`);

    this.addSql(`alter table \`bookings\` drop foreign key \`bookings_partner_id_foreign\`;`);

    this.addSql(`alter table \`tickets\` drop foreign key \`tickets_project_id_foreign\`;`);

    this.addSql(`alter table \`tickets_bookings\` drop foreign key \`tickets_bookings_tickets_entity_id_foreign\`;`);

    this.addSql(`alter table \`bookings_tickets\` drop foreign key \`bookings_tickets_tickets_entity_id_foreign\`;`);

    this.addSql(`alter table \`tickets_bookings\` drop foreign key \`tickets_bookings_bookings_entity_id_foreign\`;`);

    this.addSql(`alter table \`bookings_tickets\` drop foreign key \`bookings_tickets_bookings_entity_id_foreign\`;`);

    this.addSql(`alter table \`orders\` drop foreign key \`orders_booking_id_foreign\`;`);

    this.addSql(`alter table \`transaction\` drop foreign key \`transaction_order_id_foreign\`;`);

    this.addSql(`drop table if exists \`users\`;`);

    this.addSql(`drop table if exists \`partners\`;`);

    this.addSql(`drop table if exists \`projects\`;`);

    this.addSql(`drop table if exists \`tickets\`;`);

    this.addSql(`drop table if exists \`bookings\`;`);

    this.addSql(`drop table if exists \`tickets_bookings\`;`);

    this.addSql(`drop table if exists \`bookings_tickets\`;`);

    this.addSql(`drop table if exists \`orders\`;`);

    this.addSql(`drop table if exists \`transaction\`;`);

    this.addSql(`drop table if exists \`access_tokens\`;`);
  }

}
