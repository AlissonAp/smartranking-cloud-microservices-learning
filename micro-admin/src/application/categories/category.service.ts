import { Injectable } from '@nestjs/common';
import { Category } from '../../domain/categories/category.entity';
import { CategoryDTO } from 'src/application/categories/category.dto';
import { CategoryId } from 'src/domain/categories/category.types';
import { FindCategoryByIdUseCase } from '../../domain/categories/usecases/find-category-by-id';
import { FindAllCategoriesUseCase } from '../../domain/categories/usecases/find-all-categories';
import { CreateCategoryUseCase } from '../../domain/categories/usecases/create-category';
import { UpdateCategoryByIdUseCase } from '../../domain/categories/usecases/update-category-by-id';
import { DeleteCategoryByIdUseCase } from '../../domain/categories/usecases/delete-category-by-id';
import { MongoDbCategoryRepository } from '../../infrastructure/repositories/categories/mongoDB/mongo-db-category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: MongoDbCategoryRepository) {}

  findById(id: CategoryId): Promise<Category> {
    const findCategoryById = new FindCategoryByIdUseCase(
      this.categoryRepository,
    );
    return findCategoryById.execute(id);
  }

  findAll(): Promise<Category[]> {
    const findAllCategorys = new FindAllCategoriesUseCase(
      this.categoryRepository,
    );
    return findAllCategorys.execute();
  }

  create(category: CategoryDTO): Promise<Category> {
    const createCategory = new CreateCategoryUseCase(this.categoryRepository);
    return createCategory.execute(category);
  }

  updateById(id: CategoryId, category: CategoryDTO): Promise<void> {
    const updateCategory = new UpdateCategoryByIdUseCase(
      this.categoryRepository,
    );
    return updateCategory.execute(id, category);
  }

  deleteById(id: CategoryId): void {
    const deleteCategory = new DeleteCategoryByIdUseCase(
      this.categoryRepository,
    );
    deleteCategory.execute(id);
  }
}
