import { Request } from 'express';
import { Account } from 'src/entities/account.entity';
export interface IRequestResponse<T> {
  status: '1' | '0';
  message: 'OK';
  result: T;
}

export interface RequestUser extends Request {
  user: Account;
}
