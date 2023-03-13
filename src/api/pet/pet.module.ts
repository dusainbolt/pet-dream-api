import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/entities/pet.entity';
import { PetUserController } from './pet.controller';
import { PetHelper } from './pet.helper';
import { PetService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  providers: [PetService, PetHelper],
  controllers: [PetUserController],
})
export class PetModule {}
