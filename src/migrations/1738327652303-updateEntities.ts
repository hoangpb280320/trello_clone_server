import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEntities1738327652303 implements MigrationInterface {
  name = 'UpdateEntities1738327652303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "background" DROP CONSTRAINT "FK_0b97b6d92d5cceb85ce6059e49a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_d12f68c505cb5c19a0e6222691c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_8d511d8adacc304ec05628f524c"`,
    );
    await queryRunner.query(`ALTER TABLE "background" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "creator"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "assignee"`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD "creator_id" uuid NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "task" ADD "assignee_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_91256732111f039be6b212d96cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ALTER COLUMN "task_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "background" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "background" ADD "user_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_e9f70d01f59395c1dfdc633ae37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "list_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "list" DROP CONSTRAINT "FK_a4715a0db205a551ccce490fb2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "list" ALTER COLUMN "board_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_91256732111f039be6b212d96cd" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "background" ADD CONSTRAINT "FK_2b3e3c2f70b044be31205b2247b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_ec30ef94c7d981113563d91472b" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_75114a0b55080c15694f3d40ec9" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_e9f70d01f59395c1dfdc633ae37" FOREIGN KEY ("list_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "list" ADD CONSTRAINT "FK_a4715a0db205a551ccce490fb2d" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list" DROP CONSTRAINT "FK_a4715a0db205a551ccce490fb2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_e9f70d01f59395c1dfdc633ae37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_75114a0b55080c15694f3d40ec9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_ec30ef94c7d981113563d91472b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "background" DROP CONSTRAINT "FK_2b3e3c2f70b044be31205b2247b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_91256732111f039be6b212d96cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "list" ALTER COLUMN "board_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "list" ADD CONSTRAINT "FK_a4715a0db205a551ccce490fb2d" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "list_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_e9f70d01f59395c1dfdc633ae37" FOREIGN KEY ("list_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "background" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "background" ADD "user_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ALTER COLUMN "task_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_91256732111f039be6b212d96cd" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "assignee_id"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "creator_id"`);
    await queryRunner.query(`ALTER TABLE "task" ADD "assignee" uuid`);
    await queryRunner.query(`ALTER TABLE "task" ADD "creator" uuid`);
    await queryRunner.query(`ALTER TABLE "background" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_8d511d8adacc304ec05628f524c" FOREIGN KEY ("assignee") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_d12f68c505cb5c19a0e6222691c" FOREIGN KEY ("creator") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "background" ADD CONSTRAINT "FK_0b97b6d92d5cceb85ce6059e49a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
