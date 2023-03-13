import { Module } from '@nestjs/common';
import { PetSpecialTypeService } from './pet-special-type.service';
import { PetSpecialTypeController } from './pet-special-type.controller';
import { PetSpecialType } from 'src/entities/pet-special-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PetSpecialType])],
  providers: [PetSpecialTypeService],
  controllers: [PetSpecialTypeController],
})
export class PetSpecialTypeModule {}
