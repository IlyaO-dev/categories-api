import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Brackets, Repository } from 'typeorm';
import CategoryEntity from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCategoriesDto } from './dto/find-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  public async findById(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Couldn't find category #${id}`);
    }

    return category;
  }

  public async findBySlug(slug: string) {
    const category = await this.categoryRepository.findOneBy({ slug });

    if (!category) {
      throw new NotFoundException(
        `Couldn't find a category with slug "${slug}"`,
      );
    }

    return category;
  }

  public search(dto: FindCategoriesDto) {
    const query = this.categoryRepository.createQueryBuilder();

    if (dto.active !== undefined) {
      query.where('active = :active', { active: dto.active });
    }

    if (dto.search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('unaccent(lower(name)) = :search', { search: dto.search });
          qb.orWhere('unaccent(lower(description)) = :search', {
            search: dto.search,
          });
        }),
      );
    }

    if (dto.name) {
      query.andWhere('unaccent(lower(name)) = :name', { name: dto.name });
    }

    if (dto.description) {
      query.andWhere('unaccent(lower(description)) = :description', {
        description: dto.description,
      });
    }

    const take = dto.pageSize;
    const skip = (dto.page - 1) * dto.pageSize;

    const sortDirection = dto.sort.startsWith('-') ? 'DESC' : 'ASC';
    const sortField = sortDirection === 'DESC' ? dto.sort.slice(1) : dto.sort;

    return query
      .take(take)
      .skip(skip)
      .orderBy(`"${sortField}"`, sortDirection)
      .getMany();
  }

  public create(data: CreateCategoryDto) {
    return this.categoryRepository.save(data);
  }

  public async update(id: number, data: UpdateCategoryDto) {
    return this.categoryRepository.update({ id }, data);
  }

  public async remove(id: number) {
    return this.categoryRepository.delete({ id });
  }
}
