import { Migration } from '@mikro-orm/migrations';

export class Migration20241122132308 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`user_entity\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null, \`is_active\` tinyint(1) not null default true, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`user_entity\`;`);
  }

}
