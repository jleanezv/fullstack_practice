import { Migration } from '@mikro-orm/migrations';

export class Migration20230621161712 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "job" ("id" serial primary key, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, "title" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "job" cascade;');
  }

}
