import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetColor } from 'src/entities/pet-color.entity';
import { PetColorController } from './pet-color.controller';
import { PetColorHelper } from './pet-color.helper';
import { PetColorService } from './pet-color.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetColor])],
  providers: [PetColorService, PetColorHelper],
  controllers: [PetColorController],
  exports: [PetColorHelper],
})
export class PetColorModule {}
