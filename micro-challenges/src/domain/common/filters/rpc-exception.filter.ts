import * as businessException from '../exceptions/business.exception';
import {
  ExceptionFilter,
  Catch,
  Logger,
  HttpStatus,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllRpcExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllRpcExceptionsFilter.name);

  catch(exception: unknown): Observable<any> {

    if (exception instanceof RpcException) {

      this.logger.error(
        `RPC Exception: ${JSON.stringify(
          exception.getError(),
        )}`,
      );

      return throwError(exception.getError());
    } else {

      this.logger.error(
        `Business Error: ${JSON.stringify(
          exception
        )}`,
      );

      if (
        exception instanceof businessException.EntityAlreadyExistsError ||
        exception instanceof businessException.EntityNotFoundError ||
        exception instanceof businessException.EntityIncorrectData
      ) {
        return throwError({
          name : exception.name,
          message : exception.message
        });
      }else{
        return throwError(exception);
      }
    }
  }
}
