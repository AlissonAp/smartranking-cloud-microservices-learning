import { IsEmail, MinLength, IsNotEmpty, IsString } from 'class-validator';
import { CategoryId } from 'src/domain/micro-admin-backend/general.types';

export class PlayerDTO {
  @IsNotEmpty()
  name: string;
  @MinLength(8)
  phoneNumber: string;
  @IsEmail()
  email: string;
  profileUrlPhoto: string;
  @IsNotEmpty()
  @IsString()
  category : CategoryId;
}
