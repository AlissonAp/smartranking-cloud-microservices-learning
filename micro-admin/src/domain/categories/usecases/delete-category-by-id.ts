import { EntityNotFoundError } from 'src/domain/common/exceptions/business.exception';
import { Category } from '../category.entity';
import { CategoryRepository } from '../category.repository';
import { CategoryId } from '../category.types';

export class DeleteCategoryByIdUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: CategoryId): Promise<void> {

    const category: Category = await this.categoryRepository.findById(id);

    if(!category){
      throw new EntityNotFoundError(Category.name, id);
    }

    return this.categoryRepository.delete(id);
  }
}
