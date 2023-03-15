import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/entities/pet.entity';
import { PetColorModule } from '../pet-color/pet-color.module';
import { PetSpecialTypeModule } from '../pet-special-type/pet-special-type.module';
import { PetController, PetUserController } from './pet.controller';
import { PetHelper } from './pet.helper';
import { PetService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), PetColorModule, PetSpecialTypeModule],
  providers: [PetService, PetHelper],
  controllers: [PetUserController, PetController],
})
export class PetModule {}
