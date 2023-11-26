import { MigrationInterface, QueryRunner } from "typeorm";

export class Init21701006960761 implements MigrationInterface {
    name = 'Init21701006960761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`records\` ADD \`weather\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`records\` DROP COLUMN \`weather\``);
    }

}
