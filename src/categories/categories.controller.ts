import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import Category from './entities/category.entity';
import { FindCategoriesDto } from './dto/find-categories.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @ApiBody({ type: CreateCategoryDto })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by id' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateCategoryDto })
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by id' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Find a category by slug' })
  @ApiResponse({
    status: 200,
    description: 'Category found successfully',
    type: Category,
  })
  @ApiParam({ name: 'slug', type: String })
  findBy(@Param('slug') slug: string) {
    return this.categoriesService.findBySlug(slug);
  }

  @Get()
  @ApiOperation({ summary: 'Search for categories' })
  @ApiResponse({
    status: 200,
    description: 'Categories found successfully',
    type: [Category],
  })
  search(@Query() dto: FindCategoriesDto) {
    return this.categoriesService.search(dto);
  }
}
