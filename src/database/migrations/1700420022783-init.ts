import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1700420022783 implements MigrationInterface {
    name = 'Init1700420022783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`files\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(200) NOT NULL, \`url\` varchar(300) NOT NULL, \`state\` varchar(20) NOT NULL DEFAULT 'active', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sources\` (\`id\` int NOT NULL AUTO_INCREMENT, \`publish_date\` timestamp NOT NULL, \`doi\` varchar(255) NOT NULL, \`bibliographic_reference_harvard\` varchar(255) NOT NULL, \`file_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`records\` (\`id\` int NOT NULL AUTO_INCREMENT, \`latitude\` float NOT NULL, \`longitude\` float NOT NULL, \`information\` varchar(255) NOT NULL, \`start_date\` timestamp NOT NULL, \`end_date\` timestamp NOT NULL, \`wave_types\` varchar(255) NOT NULL, \`scale\` varchar(255) NOT NULL, \`source_generation\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`file-record\` (\`id\` int NOT NULL AUTO_INCREMENT, \`file_type\` varchar(255) NOT NULL, \`record_id\` int NULL, \`file_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`records_sources\` (\`record_id\` int NOT NULL, \`source_id\` int NOT NULL, INDEX \`IDX_ca6ab052f00d3b4c0482b8c981\` (\`record_id\`), INDEX \`IDX_a55477959a77137737264fed87\` (\`source_id\`), PRIMARY KEY (\`record_id\`, \`source_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sources\` ADD CONSTRAINT \`FK_c2239045db0b993c7bf40e5dc7f\` FOREIGN KEY (\`file_id\`) REFERENCES \`files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`file-record\` ADD CONSTRAINT \`FK_3e33fa17a81aad0afa84ad6db97\` FOREIGN KEY (\`record_id\`) REFERENCES \`records\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`file-record\` ADD CONSTRAINT \`FK_455b77681aff6b635aebc5d699c\` FOREIGN KEY (\`file_id\`) REFERENCES \`files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`records_sources\` ADD CONSTRAINT \`FK_ca6ab052f00d3b4c0482b8c981d\` FOREIGN KEY (\`record_id\`) REFERENCES \`sources\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`records_sources\` ADD CONSTRAINT \`FK_a55477959a77137737264fed874\` FOREIGN KEY (\`source_id\`) REFERENCES \`records\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`records_sources\` DROP FOREIGN KEY \`FK_a55477959a77137737264fed874\``);
        await queryRunner.query(`ALTER TABLE \`records_sources\` DROP FOREIGN KEY \`FK_ca6ab052f00d3b4c0482b8c981d\``);
        await queryRunner.query(`ALTER TABLE \`file-record\` DROP FOREIGN KEY \`FK_455b77681aff6b635aebc5d699c\``);
        await queryRunner.query(`ALTER TABLE \`file-record\` DROP FOREIGN KEY \`FK_3e33fa17a81aad0afa84ad6db97\``);
        await queryRunner.query(`ALTER TABLE \`sources\` DROP FOREIGN KEY \`FK_c2239045db0b993c7bf40e5dc7f\``);
        await queryRunner.query(`DROP INDEX \`IDX_a55477959a77137737264fed87\` ON \`records_sources\``);
        await queryRunner.query(`DROP INDEX \`IDX_ca6ab052f00d3b4c0482b8c981\` ON \`records_sources\``);
        await queryRunner.query(`DROP TABLE \`records_sources\``);
        await queryRunner.query(`DROP TABLE \`file-record\``);
        await queryRunner.query(`DROP TABLE \`records\``);
        await queryRunner.query(`DROP TABLE \`sources\``);
        await queryRunner.query(`DROP TABLE \`files\``);
    }

}
