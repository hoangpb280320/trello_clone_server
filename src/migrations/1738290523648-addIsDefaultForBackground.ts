import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsDefaultForBackground1738290523648
  implements MigrationInterface
{
  name = 'AddIsDefaultForBackground1738290523648';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "background" ADD "is_default" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "background" DROP COLUMN "is_default"`,
    );
  }
}
