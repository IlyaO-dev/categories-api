import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1687071535897 implements MigrationInterface {
  name = 'init1687071535897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "active" boolean NOT NULL DEFAULT true, "createDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS unaccent`);
    await queryRunner.query(
      `CREATE INDEX "IDX_ru_name_lower" ON "category" (lower(name COLLATE "ru_RU.utf8"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ru_desc_lower" ON "category" (lower(description COLLATE "ru_RU.utf8"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS unaccent`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_ru_name_lower"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_ru_desc_lower"`);
  }
}
