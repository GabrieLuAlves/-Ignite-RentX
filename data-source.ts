import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  host: 'database_ignite',
  username: 'docker',
  password: 'ignite',
  database: 'rentx',
  migrations: ['./src/database/migrations'],
});
