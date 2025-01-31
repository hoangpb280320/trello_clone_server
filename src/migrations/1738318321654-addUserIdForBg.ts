import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIdForBg1738318321654 implements MigrationInterface {
  name = 'AddUserIdForBg1738318321654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "background" ADD "user_id" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "background" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "background" ADD CONSTRAINT "FK_0b97b6d92d5cceb85ce6059e49a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "background" DROP CONSTRAINT "FK_0b97b6d92d5cceb85ce6059e49a"`,
    );
    await queryRunner.query(`ALTER TABLE "background" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "background" DROP COLUMN "user_id"`);
  }
}
