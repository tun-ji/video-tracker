import {MigrationInterface, QueryRunner} from "typeorm";

export class userMigration31655207268789 implements MigrationInterface {
    name = 'userMigration31655207268789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_ffc9130decfd32db957ddebbdce"`);
        await queryRunner.query(`ALTER TABLE "videos" RENAME COLUMN "statusStatusId" TO "status"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."videos_status_enum" AS ENUM('Idea', 'Writing in Progress', 'Script Ready', 'Ready to Film', 'Filmed', 'Edited', 'Waiting to be Published', 'Published')`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "status" "public"."videos_status_enum" NOT NULL DEFAULT 'Idea'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."videos_status_enum"`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "status" integer`);
        await queryRunner.query(`ALTER TABLE "videos" RENAME COLUMN "status" TO "statusStatusId"`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_ffc9130decfd32db957ddebbdce" FOREIGN KEY ("statusStatusId") REFERENCES "status"("status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
