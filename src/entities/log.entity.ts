import { ENTITY_NAME } from 'src/common/constant';
import { AbstractEntity, ErrorType } from 'src/common/interfaces';
import { Column, Entity } from 'typeorm';

@Entity(ENTITY_NAME.LOG)
export class Log extends AbstractEntity {
  @Column({ name: 'request_path', type: 'varchar' })
  requestPath: string;

  @Column({ name: 'account_id', type: 'int', nullable: true })
  accountId: number;

  @Column({ name: 'input', type: 'text', nullable: true })
  input: string;

  @Column({ name: 'error', type: 'text', nullable: true })
  error: string;

  @Column({ name: 'status', type: 'smallint', default: null })
  status: number;

  @Column({ name: 'type', type: 'enum', enum: Object.values(ErrorType) })
  type: ErrorType;
}
