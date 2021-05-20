import { Injectable } from '@nestjs/common';
import { Category } from '../category.entity';
import { CategoryRepository } from '../category.repository';

@Injectable()
export class FindAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
