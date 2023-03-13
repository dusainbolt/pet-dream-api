import { Module } from '@nestjs/common';
import { PetColorService } from './pet-color.service';
import { PetColorController } from './pet-color.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetColor } from 'src/entities/pet-color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetColor])],
  providers: [PetColorService],
  controllers: [PetColorController],
})
export class PetColorModule {}
