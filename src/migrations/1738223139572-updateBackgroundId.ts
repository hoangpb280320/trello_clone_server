import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBackgroundId1738223139572 implements MigrationInterface {
  name = 'UpdateBackgroundId1738223139572';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "background" DROP CONSTRAINT "PK_7271b4d2e4bd0f68b3fdb5c090a"`,
    );
    await queryRunner.query(`ALTER TABLE "background" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "background" ADD "id" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "background" ADD CONSTRAINT "PK_7271b4d2e4bd0f68b3fdb5c090a" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "background" DROP CONSTRAINT "PK_7271b4d2e4bd0f68b3fdb5c090a"`,
    );
    await queryRunner.query(`ALTER TABLE "background" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "background" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "background" ADD CONSTRAINT "PK_7271b4d2e4bd0f68b3fdb5c090a" PRIMARY KEY ("id")`,
    );
  }
}
