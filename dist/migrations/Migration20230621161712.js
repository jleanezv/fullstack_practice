"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230621161712 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230621161712 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "job" ("id" serial primary key, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, "title" varchar(255) not null);');
    }
    async down() {
        this.addSql('drop table if exists "job" cascade;');
    }
}
exports.Migration20230621161712 = Migration20230621161712;
//# sourceMappingURL=Migration20230621161712.js.map