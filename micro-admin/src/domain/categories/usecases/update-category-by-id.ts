import { Category } from '../category.entity';
import { CategoryId } from '../category.types';
import { CategoryRepository } from '../category.repository';
import { CategoryDTO } from '../../../application/categories/category.dto';

export class UpdateCategoryByIdUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: CategoryId, data: CategoryDTO): Promise<void> {
    const category = new Category(data, id);
    return this.categoryRepository.update(id, category);
  }
}
