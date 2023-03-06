import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  /**
   * Creation date is generated and inserted only once,
   * at the first time when you create an object, the value is inserted into the table, and is never touched again.
   */
  @CreateDateColumn({ name: 'created_On', type: 'timestamptz' })
  createdOn: Date;

  // This date is being updated each time you persist the object.
  @UpdateDateColumn({ name: 'updated_On', type: 'timestamptz' })
  updatedOn: Date;
}
