import { Module } from '@nestjs/common';
import { AccountModule } from 'src/api/account/account.module';
import { SeedingService } from './seeding.service';

@Module({
  imports: [AccountModule],
  providers: [SeedingService],
})
export class SeedingModule {}
