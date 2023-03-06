import { Get, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { IsAuthController } from './common/decorators';
import { ERROR_CODE } from './common/interfaces';
import { AppException } from './middleware';

@IsAuthController(`healthcheck`, 'Healthy App', false)
export class AppController {
  @Get('/')
  @ApiOperation({ summary: 'Check app is running' })
  getHello(@Query() query: { address: string }): any {
    if (!query.address) throw new AppException(ERROR_CODE.ERROR_EXCEPTION);
    return 'thing';
  }
}
