import { Category } from '../category.entity';
import { CategoryRepository } from '../category.repository';
import { CategoryDTO } from '../../../application/categories/category.dto';
import { EntityAlreadyExistsError } from 'src/domain/common/exceptions/business.exception';

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(data: CategoryDTO): Promise<Category> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      data.name,
    );

    if (categoryAlreadyExists) {
      throw new EntityAlreadyExistsError(Category.name);
    }

    const category: Category = new Category({
      name: data.name,
      description: data.description,
      events: data.events
    });

    return this.categoryRepository.create(category);
  }
}
