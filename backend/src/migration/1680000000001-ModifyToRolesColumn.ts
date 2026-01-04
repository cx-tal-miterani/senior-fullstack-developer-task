import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyToRolesColumn1680000000001 implements MigrationInterface {
  name = 'ModifyToRolesColumn1680000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users RENAME COLUMN role TO roles`);
    await queryRunner.query(`UPDATE users SET roles = '["' || roles || '"]'`);
    await queryRunner.query(`UPDATE users SET status = CASE WHEN status = 1 THEN 'Enabled' ELSE 'Disabled' END`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE users SET status = CASE WHEN status = 'Enabled' THEN 1 ELSE 0 END`);
    await queryRunner.query(`UPDATE users SET roles = REPLACE(REPLACE(roles, '["', ''), '"]', '')`);
    await queryRunner.query(`ALTER TABLE users RENAME COLUMN roles TO role`);
  }
}

