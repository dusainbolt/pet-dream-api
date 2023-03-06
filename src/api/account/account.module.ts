import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { AccountAdminController, AccountController } from './account.controller';
import { AccountHelper } from './account.helper.service';
import { AccountService } from './account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService, AccountHelper],
  controllers: [AccountController, AccountAdminController],
  exports: [AccountHelper],
})
export class AccountModule {}
