import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { CategoryId } from 'src/domain/categories/category.types';

export class PlayerDTO {
  @IsNotEmpty()
  name: string;
  @MinLength(8)
  phoneNumber: string;
  @IsEmail()
  email: string;
  profileUrlPhoto: string;
  category: CategoryId;
}
