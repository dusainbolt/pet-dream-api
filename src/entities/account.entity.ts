import { AccountRole, AccountStatus } from 'src/api/account/account.interface';
import { ENTITY_NAME } from 'src/common/constant';
import { AbstractEntity } from 'src/common/interfaces';
import { Column, Entity, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';

@Entity(ENTITY_NAME.ACCOUNT)
export class Account extends AbstractEntity {
  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'username', type: 'varchar', unique: true })
  username: string;

  @Column({ name: 'full_name', type: 'varchar', default: null })
  fullName: string;

  @Column({ name: 'avatar', type: 'varchar', default: null })
  avatar: string;

  @Column({ name: 'password', type: 'varchar', default: null })
  password: string;

  @Column({ name: 'status', type: 'enum', enum: Object.values(AccountStatus), default: AccountStatus.NOT_VERIFY })
  status: AccountStatus;

  @Column({ name: 'role', type: 'enum', enum: Object.values(AccountRole), default: AccountRole.USER })
  role: AccountRole;

  @OneToMany(() => Pet, pet => pet.account)
  pets?: Pet[];
}
