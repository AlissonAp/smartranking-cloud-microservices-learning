import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'src/domain/common/exceptions/business.exception';
import { Category } from '../category.entity';
import { CategoryRepository } from '../category.repository';
import { CategoryId } from '../category.types';

@Injectable()
export class FindCategoryByIdUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: CategoryId): Promise<Category> {

    const category = await this.categoryRepository.findById(id);

    if(!category){
      throw new EntityNotFoundError(Category.name, id);
    }

    return this.categoryRepository.findById(id);
  }
}
