import { Migration } from '@mikro-orm/migrations';

export class Migration20241122133000 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`users\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null, \`is_active\` tinyint(1) not null default true, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB comment = 'ตารางเก็บข้อมูลผู้ใช้งาน';`);

    this.addSql(`drop table if exists \`user_entity\`;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table \`user_entity\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null, \`is_active\` tinyint(1) not null default true, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`drop table if exists \`users\`;`);
  }

}
