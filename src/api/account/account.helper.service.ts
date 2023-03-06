import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_CODE } from 'src/common/interfaces';
import { Account } from 'src/entities/account.entity';
import { AppException } from 'src/middleware';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { AccountStatus } from './account.interface';

@Injectable()
export class AccountHelper {
  constructor(@InjectRepository(Account) private accountRepo: Repository<Account>) {}

  async findAccount(filter: FindOptionsWhere<Account>): Promise<Account> {
    return await this.accountRepo.findOneBy(filter);
  }

  async findAccountWhere(filter: FindOptionsWhere<Account>[] | FindOptionsWhere<Account>): Promise<Account> {
    return await this.accountRepo.findOne({ where: filter });
  }

  async insertAccount(data: DeepPartial<Account>): Promise<Account> {
    return await this.accountRepo.save(data);
  }

  async getAccByCredential(credential: string): Promise<Account> {
    return this.findAccountWhere([{ email: credential }, { username: credential }]);
  }

  isExistAccount = (account: Account) => {
    if (!account) {
      throw new AppException(ERROR_CODE.ACCOUNT_NOT_FOUND);
    }
  };

  isAccountNotVerify = (account: Account) => {
    if (account.status !== AccountStatus.NOT_VERIFY) {
      throw new AppException(ERROR_CODE.ACCOUNT_VERIFIED);
    }
  };
}
