import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environments } from './config.constants';

@Injectable()
export class ConfigService {
  public readonly nodeEnv = process.env.NODE_ENV;

  public readonly isProduction = this.nodeEnv === Environments.PRODUCTION;

  public readonly port: number = Number(process.env.PORT);

  private isBoolean = (value: string) => value === 'true';

  public readonly dbOptions: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: this.isBoolean(process.env.DATABASE_SSL ?? 'false'),
    autoLoadEntities: true,
    synchronize: false,
  };
}
