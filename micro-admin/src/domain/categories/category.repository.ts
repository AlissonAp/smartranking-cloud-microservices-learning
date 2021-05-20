import { PlayerId } from '../players/player.types';
import { Category } from './category.entity';
import { CategoryId } from './category.types';

export interface CategoryRepository {
  findById(id: CategoryId): Promise<Category>;
  findByName(name: string): Promise<Category>;
  findAll(): Promise<Category[]>;
  create(category: Category): Promise<Category>;
  update(id: CategoryId, category: Category): void;
  delete(id: CategoryId): void;
  findByPlayer(id: PlayerId): Promise<Category>;
}
