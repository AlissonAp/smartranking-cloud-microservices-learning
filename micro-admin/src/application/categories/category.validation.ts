import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

export class CategoryIdValidationPipe implements PipeTransform {
  transform(id: string, metadata: ArgumentMetadata) {
    if (!id) {
      throw new BadRequestException(
        `O valor do parâmetro ${metadata.data} deve ser informado!`,
      );
    }
    return id;
  }
}
