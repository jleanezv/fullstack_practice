"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230621173204 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230621173204 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "job" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
        this.addSql('alter table "job" alter column "created_at" set default \'NOW()\';');
        this.addSql('alter table "job" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
        this.addSql('alter table "job" alter column "title" type text using ("title"::text);');
    }
    async down() {
        this.addSql('alter table "job" alter column "created_at" drop default;');
        this.addSql('alter table "job" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));');
        this.addSql('alter table "job" alter column "updated_at" type varchar(255) using ("updated_at"::varchar(255));');
        this.addSql('alter table "job" alter column "title" type varchar(255) using ("title"::varchar(255));');
    }
}
exports.Migration20230621173204 = Migration20230621173204;
//# sourceMappingURL=Migration20230621173204.js.map