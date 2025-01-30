import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBackgroundEntity1738211339800 implements MigrationInterface {
  name = 'AddBackgroundEntity1738211339800';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "background" ("id" SERIAL NOT NULL, "title" character varying(20) NOT NULL, "image" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7271b4d2e4bd0f68b3fdb5c090a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "background"`);
  }
}
