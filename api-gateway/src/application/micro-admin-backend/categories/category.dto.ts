import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { PlayerId, Event } from 'src/domain/micro-admin-backend/general.types';

export class CategoryDTO {
  @IsNotEmpty()
  name: string;
  description: string;
  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}
