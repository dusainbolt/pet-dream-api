import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_CODE } from 'src/common/interfaces';
import { BaseRepository } from 'src/common/service/base-repository';
import { Account } from 'src/entities/account.entity';
import { AppException } from 'src/middleware';
import { Repository } from 'typeorm';
import { AccountStatus } from './account.interface';

@Injectable()
export class AccountHelper extends BaseRepository<Account> {
  constructor(@InjectRepository(Account) private accountRepo: Repository<Account>) {
    super(accountRepo);
  }

  async getAccByCredential(credential: string): Promise<Account> {
    return this.findOne({ where: [{ email: credential }, { username: credential }] });
  }

  isExistAccountMsg = (account: Account) => {
    if (!account) {
      throw new AppException(ERROR_CODE.ACCOUNT_NOT_FOUND);
    }
  };

  isAccountNotVerifyMsg = (account: Account) => {
    if (account.status !== AccountStatus.NOT_VERIFY) {
      throw new AppException(ERROR_CODE.ACCOUNT_VERIFIED);
    }
  };
}
