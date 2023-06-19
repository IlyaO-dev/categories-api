import { SearchDto } from '../../common/dto/search.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

const sortableProperties = [
  'id',
  'slug',
  'name',
  'description',
  'active',
  'createDate',
];

export class FindCategoriesDto extends SearchDto {
  @ApiProperty({
    required: false,
    description: 'Sort',
    example: '-createDate',
  })
  @Transform(({ value }) => {
    const isSortable =
      sortableProperties.includes(value) ||
      sortableProperties.includes(value.slice(1));

    return isSortable ? value : '-createdDate';
  })
  @IsOptional()
  public readonly sort: string = '-createDate';
}
