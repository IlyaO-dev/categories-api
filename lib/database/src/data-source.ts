import { Logger } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

const logger = new Logger('DataSource');

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: process.env.DATABASE_SSL === 'true',
  synchronize: false,
  entities: [join(__dirname, '../../../', '**', '*.entity.{ts,js}')],
  migrations: [`${__dirname}/migrations/*.ts`],
};

export const AppDataSource = new DataSource(config);

AppDataSource.initialize()
  .then(() => {
    logger.log(`Connected to database!`);
  })
  .catch((err) => {
    throw err;
  });
