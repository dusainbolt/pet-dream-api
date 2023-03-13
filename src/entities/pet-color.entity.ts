import { ENTITY_NAME } from 'src/common/constant';
import { AbstractEntity } from 'src/common/interfaces';
import { Column, Entity } from 'typeorm';

@Entity(ENTITY_NAME.PET_COLOR)
export class PetColor extends AbstractEntity {
  @Column({ name: 'value', type: 'varchar', default: null })
  value: string;
}
