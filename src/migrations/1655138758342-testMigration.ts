import {MigrationInterface, QueryRunner} from "typeorm";

export class testMigration1655138758342 implements MigrationInterface {
    name = 'testMigration1655138758342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "status" ("status_id" SERIAL NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_c29343a0448c20d631bbca4a5ab" PRIMARY KEY ("status_id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("task_no" SERIAL NOT NULL, "task" character varying NOT NULL, "videoVidId" integer, CONSTRAINT "PK_dcf498eb49a3684b842e6dc3be8" PRIMARY KEY ("task_no"))`);
        await queryRunner.query(`CREATE TABLE "videos" ("vid_id" SERIAL NOT NULL, "thumbnail" character varying NOT NULL, "title" character varying NOT NULL, "publish_date" TIMESTAMP NOT NULL, "url" character varying NOT NULL, "statusStatusId" integer, "userUserId" integer, CONSTRAINT "PK_a502107b9e53b26f3165295019f" PRIMARY KEY ("vid_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_af4774ab986af6f50fda57c5aab" FOREIGN KEY ("videoVidId") REFERENCES "videos"("vid_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_ffc9130decfd32db957ddebbdce" FOREIGN KEY ("statusStatusId") REFERENCES "status"("status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_b93997bcf30d4432a26386bdd5b" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_b93997bcf30d4432a26386bdd5b"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_ffc9130decfd32db957ddebbdce"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_af4774ab986af6f50fda57c5aab"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "status"`);
    }

}
