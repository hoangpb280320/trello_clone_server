import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBoard1738233544463 implements MigrationInterface {
  name = 'UpdateBoard1738233544463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board" RENAME COLUMN "background" TO "background_id"`,
    );
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "background_id"`);
    await queryRunner.query(
      `ALTER TABLE "board" ADD "background_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "board" ADD CONSTRAINT "FK_caa55336519de343bb63e66defc" FOREIGN KEY ("background_id") REFERENCES "background"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board" DROP CONSTRAINT "FK_caa55336519de343bb63e66defc"`,
    );
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "background_id"`);
    await queryRunner.query(
      `ALTER TABLE "board" ADD "background_id" character varying(500) NOT NULL DEFAULT 'bg-1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "board" RENAME COLUMN "background_id" TO "background"`,
    );
  }
}
