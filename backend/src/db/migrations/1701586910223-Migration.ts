import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701586910223 implements MigrationInterface {
    name = 'Migration1701586910223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`execution_result\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL, \`runtime\` int NOT NULL, \`mem_usage\` int NOT NULL, \`core_usage\` int NOT NULL, \`code_id\` int NULL, UNIQUE INDEX \`REL_9492f30a2cf64a8e45cc15e9ef\` (\`code_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`code\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`emission\` int NOT NULL, \`execution_result_id\` int NULL, UNIQUE INDEX \`REL_125442497e99b48389c75ef17a\` (\`execution_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`execution_result\` ADD CONSTRAINT \`FK_9492f30a2cf64a8e45cc15e9eff\` FOREIGN KEY (\`code_id\`) REFERENCES \`code\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`code\` ADD CONSTRAINT \`FK_125442497e99b48389c75ef17ae\` FOREIGN KEY (\`execution_result_id\`) REFERENCES \`execution_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`code\` DROP FOREIGN KEY \`FK_125442497e99b48389c75ef17ae\``);
        await queryRunner.query(`ALTER TABLE \`execution_result\` DROP FOREIGN KEY \`FK_9492f30a2cf64a8e45cc15e9eff\``);
        await queryRunner.query(`DROP INDEX \`REL_125442497e99b48389c75ef17a\` ON \`code\``);
        await queryRunner.query(`DROP TABLE \`code\``);
        await queryRunner.query(`DROP INDEX \`REL_9492f30a2cf64a8e45cc15e9ef\` ON \`execution_result\``);
        await queryRunner.query(`DROP TABLE \`execution_result\``);
    }

}
