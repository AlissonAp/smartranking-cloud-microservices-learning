import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { Event } from '../../domain/categories/category.entity';

export class CategoryDTO {
  @IsNotEmpty()
  name: string;
  description: string;
  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}
