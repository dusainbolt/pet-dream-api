import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { AppException } from 'src/middleware';
import { PATH_EXCLUDE } from '../../common/constant';
import { ERROR_CODE } from '../../common/interfaces/error.interface';
import { AccountStatus } from '../account/account.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const response = super.canActivate(context);
    return response;
  }

  handleRequest<TUser = any>(err: any, user: any, info: any, context: any): TUser {
    const request = context.switchToHttp().getRequest();

    if (info instanceof TokenExpiredError) {
      throw new AppException(ERROR_CODE.AUTH_TOKEN_EXPIRED);
    }
    if (info instanceof NotBeforeError) {
      throw new AppException(ERROR_CODE.AUTH_TOKEN_CLAIMS_BEFORE);
    }
    if (info instanceof JsonWebTokenError) {
      throw new AppException(ERROR_CODE.AUTH_TOKEN_INVALID);
    }
    if (err || !user) throw new AppException(ERROR_CODE.AUTH_UNAUTHORIZED_ACCESS_TOKEN);

    if (user.status === AccountStatus.INACTIVE) {
      throw new AppException(ERROR_CODE.ACCOUNT_INACTIVE);
    }
    if (user.active === false && Object.values(PATH_EXCLUDE).includes(request.path) === false) {
      throw new AppException(ERROR_CODE.ACCOUNT_INACTIVE);
    }
    return user;
  }
}
