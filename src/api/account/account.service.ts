import { Injectable } from '@nestjs/common';
import { AccountHelper } from './account.helper.service';

@Injectable()
export class AccountService {
  constructor(private readonly accountHelper: AccountHelper) {}

  async getAccountById(id: number) {
    return await this.accountHelper.findAccount({ id });
  }
}
