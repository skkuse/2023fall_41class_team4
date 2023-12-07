import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701882367417 implements MigrationInterface {
    name = 'Migration1701882367417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`emission\` ADD UNIQUE INDEX \`IDX_a74dc1b6458aaa11ed2d60f6b9\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`emission\` DROP INDEX \`IDX_a74dc1b6458aaa11ed2d60f6b9\``);
    }

}
