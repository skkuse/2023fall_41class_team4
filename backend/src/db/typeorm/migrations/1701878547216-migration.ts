import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701878547216 implements MigrationInterface {
    name = 'Migration1701878547216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`execution_result\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL, \`runtime\` double NOT NULL, \`mem_usage\` bigint NOT NULL, \`core_usage\` double NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`code\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`emission\` double NOT NULL, \`execution_result_id\` int NULL, UNIQUE INDEX \`REL_125442497e99b48389c75ef17a\` (\`execution_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`emission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`emission\` double NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`code\` ADD CONSTRAINT \`FK_125442497e99b48389c75ef17ae\` FOREIGN KEY (\`execution_result_id\`) REFERENCES \`execution_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`code\` DROP FOREIGN KEY \`FK_125442497e99b48389c75ef17ae\``);
        await queryRunner.query(`DROP TABLE \`emission\``);
        await queryRunner.query(`DROP INDEX \`REL_125442497e99b48389c75ef17a\` ON \`code\``);
        await queryRunner.query(`DROP TABLE \`code\``);
        await queryRunner.query(`DROP TABLE \`execution_result\``);
    }

}
