import { Injectable } from '@nestjs/common';
import { SystemException } from 'src/domain/common/exceptions/system.exception';

@Injectable()
export class ExceptionFilterService {
  private systemException = new SystemException();

  isAckException(exception: Error): Boolean {
    return this.systemException.isAckException(exception);
  }
}
