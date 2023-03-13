import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './api/account/account.module';
import { AuthModule } from './api/auth/auth.module';
import { PetModule } from './api/pet/pet.module';
import { AppController } from './app.controller';
import { Log } from './entities/log.entity';
import { SeedingModule } from './seeding/seeding.module';
import { SharedModule } from './shared/shared.module';
import { PetColorModule } from './api/pet-color/pet-color.module';
import { PetSpecialTypeModule } from './api/pet-special-type/pet-special-type.module';

@Module({
  imports: [
    // Service module
    SharedModule,
    SeedingModule,
    // GatewayModule,
    // Entity module
    TypeOrmModule.forFeature([Log]),
    AccountModule,
    AuthModule,
    PetModule,
    PetColorModule,
    PetSpecialTypeModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
