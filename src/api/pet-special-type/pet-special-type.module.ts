import { Module } from '@nestjs/common';
import { PetSpecialTypeService } from './pet-special-type.service';
import { PetSpecialTypeController } from './pet-special-type.controller';
import { PetSpecialType } from 'src/entities/pet-special-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetSpecialTypeHelper } from './pet-special-type.helper';

@Module({
  imports: [TypeOrmModule.forFeature([PetSpecialType])],
  providers: [PetSpecialTypeService, PetSpecialTypeHelper],
  controllers: [PetSpecialTypeController],
  exports: [PetSpecialTypeHelper],
})
export class PetSpecialTypeModule {}
