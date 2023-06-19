import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from './pagination.dto';

export class SearchDto extends PaginationDto {
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    required: false,
    description: 'Category search',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    required: false,
    description: 'Category name',
  })
  @Transform(({ obj, value }) => (obj.search ? null : value.trim()))
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    description: 'Category description',
  })
  @Transform(({ obj, value }) => (obj.search ? null : value.trim()))
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: false,
    description: 'Category status',
  })
  @Transform(({ value }) => {
    if (value === 'false' || value === '0') {
      return false;
    }
    if (value === 'true' || value === '1') {
      return true;
    }
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
