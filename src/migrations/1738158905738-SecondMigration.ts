import { MigrationInterface, QueryRunner } from 'typeorm';

export class SecondMigration1738158905738 implements MigrationInterface {
  name = 'SecondMigration1738158905738';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board_roles" DROP CONSTRAINT "FK_53317a119852781e81c9fa5183d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_roles" DROP CONSTRAINT "FK_d1400e6b8772bac554d18e95a4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_roles" ALTER COLUMN "board_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_roles" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_roles" ADD CONSTRAINT "FK_53317a119852781e81c9fa5183d" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_roles" ADD CONSTRAINT "FK_d1400e6b8772bac554d18e95a4b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board_roles" DROP CONSTRAINT "FK_d1400e6b8772bac554d18e95a4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_roles" DROP CONSTRAINT "FK_53317a119852781e81c9fa5183d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_roles" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_roles" ALTER COLUMN "board_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_roles" ADD CONSTRAINT "FK_d1400e6b8772bac554d18e95a4b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_roles" ADD CONSTRAINT "FK_53317a119852781e81c9fa5183d" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
