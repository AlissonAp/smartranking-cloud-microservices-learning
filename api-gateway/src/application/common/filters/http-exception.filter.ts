import * as businessException from '../../../domain/common/business.exception';
import {
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllHttpExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllHttpExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Not handled exception';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (
      exception.name === businessException.EntityAlreadyExistsError.name
    ) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if (exception.name === businessException.EntityNotFoundError.name) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception.name === businessException.EntityIncorrectData.name) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception;
    }

    if (status >= 500) {
      this.logger.error(
        `Http Status: ${status} | Server Error Message: ${JSON.stringify(
          message,
        )}`,
      );
    } else {
      this.logger.warn(
        `Http Status: ${status} | Client Error Message: ${JSON.stringify(
          message,
        )}`,
      );
    }

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
