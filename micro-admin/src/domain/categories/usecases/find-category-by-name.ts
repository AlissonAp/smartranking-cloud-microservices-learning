import { Injectable } from '@nestjs/common';
import { Category } from '../category.entity';
import { CategoryRepository } from '../category.repository';

@Injectable()
export class FindCategoryByNameUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(name: string): Promise<Category> {
    return this.categoryRepository.findByName(name);
  }
}
