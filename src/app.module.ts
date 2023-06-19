import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { DatabaseModule } from '../lib/database/src';

@Module({
  imports: [DatabaseModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
