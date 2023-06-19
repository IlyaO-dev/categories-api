import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import Category from './entities/category.entity';
import { UniqueSlugValidator } from './validators/unique-slug.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, UniqueSlugValidator],
})
export class CategoriesModule {}
