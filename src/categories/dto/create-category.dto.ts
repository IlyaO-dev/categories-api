import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { IsUniqueSlug } from '../validators/unique-slug.validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category slug. Must be unique',
  })
  @IsUniqueSlug()
  @IsString()
  slug: string;

  @ApiProperty({
    description: 'Category name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Category description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Category status',
  })
  @IsBoolean()
  active: boolean;
}
