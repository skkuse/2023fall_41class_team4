import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702821915336 implements MigrationInterface {
    name = 'Migration1702821915336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`code\` CHANGE \`emission\` \`emission\` double NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`code\` CHANGE \`emission\` \`emission\` double NOT NULL`);
    }

}
