import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({
    required: false,
    description: 'Page',
  })
  @Type(() => Number)
  @Transform(({ value }) => (value === 0 ? 1 : value))
  @IsInt()
  @Min(0)
  @IsOptional()
  public readonly page: number = 1;

  @ApiProperty({
    required: false,
    description: 'Page size',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(9)
  @IsOptional()
  public readonly pageSize: number = 2;
}
