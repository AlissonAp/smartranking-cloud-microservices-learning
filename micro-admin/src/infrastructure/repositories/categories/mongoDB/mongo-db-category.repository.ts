import { Model } from 'mongoose';
import { Inject } from '@nestjs/common';
import { CategoryModel } from './mongo-db-category.schema';
import { Category } from '../../../../domain/categories/category.entity';
import { CategoryRepository } from '../../../../domain/categories/category.repository';
import { CategoryId } from 'src/domain/categories/category.types';
import { PlayerId } from 'src/domain/players/player.types';

export class MongoDbCategoryRepository implements CategoryRepository {
  constructor(
    @Inject('CategoryModelToken')
    private readonly categoryModel: Model<CategoryModel>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  findById(id: CategoryId): Promise<Category> {
    return this.categoryModel.findOne({ id }).exec();
  }

  findByName(name: string): Promise<Category> {
    return this.categoryModel.findOne({ name }).exec();
  }

  findByPlayer(id: PlayerId): Promise<Category> {
    return this.categoryModel.findOne({ players: id }).exec();
  }

  create(category: Category): Promise<Category> {
    return this.categoryModel.create(category);
  }

  update(id: CategoryId, category: Partial<Category>): Promise<Category> {
    return this.categoryModel.findOneAndUpdate({ id }, category).exec();
  }

  delete(id: CategoryId): void {
    this.categoryModel.deleteOne({ id }).exec();
  }
}
