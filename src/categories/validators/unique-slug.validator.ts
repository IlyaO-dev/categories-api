import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Category from '../entities/category.entity';

export function IsUniqueSlug(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: {
        message: '$property must be a unique slug, "$value" is already used',
        ...validationOptions,
      },
      validator: UniqueSlugValidator,
    });
  };
}

@ValidatorConstraint({ name: 'SlugUnique', async: true })
@Injectable()
export class UniqueSlugValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async validate(value: string) {
    const categories = await this.categoryRepository.query(
      `
SELECT category.id, category.slug
FROM category
WHERE category.slug = $1
LIMIT 1;
`,
      [value],
    );

    return categories.length === 0;
  }
}
