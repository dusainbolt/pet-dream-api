import { Get, Param, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ENTITY_NAME } from 'src/common/constant';
import { IsAuthController } from 'src/common/decorators';
import { RequestUser } from 'src/common/interfaces';
import { Roles } from '../auth/roles.decorator';
import { AccountRole } from './account.interface';
import { AccountService } from './account.service';

@IsAuthController(ENTITY_NAME.ACCOUNT, 'Account')
@Roles(AccountRole.ADMIN, AccountRole.USER)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/my-info')
  @ApiOperation({ summary: 'Get my info' })
  async getMyInfo(@Req() req: RequestUser) {
    return { account: req.user };
  }
}

@IsAuthController(`admin/${ENTITY_NAME.ACCOUNT}`, 'AccountAdmin')
@Roles(AccountRole.ADMIN)
export class AccountAdminController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/:accountId')
  @ApiOperation({ summary: 'Get account info by id' })
  async getAccountInfo(@Param('accountId') accountId: string) {
    return await this.accountService.getAccountById(parseInt(accountId));
  }
}
