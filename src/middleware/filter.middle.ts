import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpServer,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';
import { isArray } from 'lodash';
import { Logger } from 'nestjs-pino';
import { ERROR } from 'src/common/errors';
import { ErrorType, ERROR_CODE, RequestUser } from 'src/common/interfaces';
import { Log } from 'src/entities/log.entity';

export class AppException extends HttpException {
  public errorCode: string;
  constructor(errorCode: ERROR_CODE, message?: string) {
    const { status, ...error } = ERROR[errorCode];
    if (message) error.message = message;
    super(error, status);
    this.errorCode = error.code;
  }
}

@Catch()
export class AppExceptionFilter extends BaseExceptionFilter {
  constructor(private readonly _logger: Logger, applicationRef?: HttpServer) {
    super(applicationRef);
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestUser>();

    const log = new Log();
    if (request.body.password) delete request.body.password;
    log.requestPath = request.url;
    log.accountId = request?.user?.id || undefined;
    log.input = JSON.stringify({ query: request.query, body: request.body });
    log.error = JSON.stringify(exception);
    log.type = exception instanceof AppException ? ErrorType.APP_ERROR : ErrorType.SERVER_ERROR;
    log.save();
    console.log('exception exception', exception);
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '';
    if (exception?.getResponse) {
      message =
        typeof exception.getResponse() === 'object'
          ? (exception.getResponse() as any).message
          : exception.getResponse();
    } else {
      message = exception.toString();
    }
    const errorResponse = {
      status,
      data: {
        error: getReasonPhrase(status),
        message,
        errorCode:
          exception instanceof BadRequestException
            ? HttpStatus.BAD_REQUEST.toString()
            : exception instanceof AppException
            ? exception.errorCode
            : HttpStatus.INTERNAL_SERVER_ERROR.toString(),
      },
    };

    this._logger.error(
      `${request.method} ${request.url}`,
      status === HttpStatus.INTERNAL_SERVER_ERROR ? exception.stack : JSON.stringify(errorResponse),
      'ExceptionFilter',
    );
    if (isArray(errorResponse.data.message)) {
      errorResponse.data.message = errorResponse.data.message[0];
    }
    return response.status(status).json(errorResponse);
  }
}
