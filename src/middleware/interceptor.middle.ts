import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  NestInterceptor,
} from '@nestjs/common';
import { ClassTransformOptions, instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { isArray, isObject } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IResponse<T> {
  status: HttpStatus;
  data: T;
}

export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  // private logger = new Logger('TransformInterceptor');

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
      // tap(() => this.logger.log('TransformInterceptor intercept response...')),
      map((res) => {
        return {
          status: context.switchToHttp().getResponse<Response>().statusCode,
          data: isObject(res) ? this.transformResponse(res, req.user) : res,
        };
      }),
    );
  }

  transformResponse(response, user?: any) {
    const options = user?.role ? { groups: [user.role] } : {};
    if (response.meta && response.items) {
      response.items = response.items.map((res) =>
        this.transformToPlain(res, options),
      );
    }
    return isArray(response)
      ? response.map((res) => this.transformToPlain(res, options))
      : this.transformToPlain(response, options);
  }

  transformToPlain(plainOrClass, options: ClassTransformOptions = {}) {
    return plainOrClass && plainOrClass.constructor !== Object
      ? instanceToPlain(plainOrClass, options)
      : plainOrClass;
  }
}
