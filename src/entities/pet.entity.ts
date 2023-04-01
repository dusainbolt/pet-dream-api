import { ENTITY_NAME } from 'src/common/constant';
import { AbstractEntity } from 'src/common/interfaces';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Account } from './account.entity';
import { PetColor } from './pet-color.entity';
import { PetSpecialType } from './pet-special-type.entity';

export enum PetGender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum PetTail {
  NONE = 'none',
  MAU = 'mau',
  COC = 'coc',
  DAI = 'dai'
}

export enum PetEye {
  HAZEL = 'hazel',
  YELLOW_AMBER = 'yellow_amber',
  GREEN = 'green',
  BLUE = 'blue',
  ORANGE = 'orange_copper',
  ODD_COLORED = 'odd_colored',
  DICHROIC = 'dichroic'
}

export enum PetEar {
  THANG = 'thang',
  CUP = 'cup'
}

export enum PetHair {
  DAI = 'dai',
  NGAN = 'ngan',
  BRUSH = 'brush',
  THANG = 'thang'
}

@Entity(ENTITY_NAME.PET)
export class Pet extends AbstractEntity {
  @Column({ name: 'name', type: 'varchar', default: null })
  name: string;

  @Column({ name: 'nick_name', type: 'varchar', default: null })
  nickname: string;

  @Column({ name: 'bio', type: 'varchar', default: null })
  bio: string;

  @Column({ name: 'favorite', type: 'varchar', default: null })
  favorite: string;

  @Column({ name: 'birthday', type: 'timestamptz', default: null })
  birthday: Date;

  @Column({ name: 'avatar', type: 'varchar', default: null })
  avatar: string;

  @Column({ name: 'cover', type: 'varchar', default: null })
  cover: string;

  @Column({ name: 'gender', type: 'enum', enum: Object.values(PetGender), default: null })
  gender: PetGender;

  @Column({ name: 'tail', type: 'enum', enum: Object.values(PetTail), default: null })
  tail: PetTail;

  @Column({ name: 'ear', type: 'enum', enum: Object.values(PetEar), default: null })
  ear: PetEar;

  @Column({ name: 'eye', type: 'enum', enum: Object.values(PetEye), default: null })
  eye: PetEye;

  @Column({ name: 'hair', type: 'enum', enum: Object.values(PetHair), default: null })
  hair: PetHair;

  @Column({ type: 'int', name: 'account_id' })
  accountId: number;

  @Column({ type: 'int', name: 'pet_color_id', default: null })
  petColorId: number;

  @Column({ type: 'int', name: 'pet_special_type', default: null })
  petSpecialTypeId: number;

  // RELATIONSHIP
  @ManyToOne(() => Account, account => account.pets)
  @JoinColumn({ name: 'account_id' })
  account?: Account;

  @OneToOne(() => PetColor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pet_color_id' })
  petColor: PetColor;

  @OneToOne(() => PetSpecialType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pet_special_type' })
  petSpecialType: PetSpecialType;
}
