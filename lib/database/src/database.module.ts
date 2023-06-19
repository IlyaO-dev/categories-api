import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '../../config/src';
import Category from '../../../src/categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.dbOptions,
    }),
    TypeOrmModule.forFeature([Category]),
  ],
  providers: [],
})
export class DatabaseModule {}
