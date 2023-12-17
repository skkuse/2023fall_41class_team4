import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({ path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env' });
const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASS'),
  database: configService.get('DATABASE_NAME'),
  entities: ['src/db/entity/*.entity.ts'],
  migrations: ['src/db/typeorm/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: true,
});
