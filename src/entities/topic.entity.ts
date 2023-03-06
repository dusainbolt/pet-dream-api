import { ENTITY_NAME } from 'src/common/constant';
import { AbstractEntity } from 'src/common/interfaces';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Account } from './account.entity';
import { Message } from './message.entity';

@Entity(ENTITY_NAME.topic)
export class Topic extends AbstractEntity {
  @Column({ type: 'varchar', name: 'title' })
  title: string;

  @Column({ type: 'int', name: 'account_id', nullable: true })
  accountId: number;

  @Column({ type: 'int', name: 'latest_message_id', nullable: true })
  latestMessageId: number;

  @ManyToOne(() => Account, account => account.topics)
  @JoinColumn({ name: 'account_id' })
  account?: Account;

  // define relationship with profiles table
  @OneToOne(() => Message, Message => Message.topic)
  @JoinColumn({ name: 'latest_message_id' })
  latestMessage: Message;

  @OneToMany(() => Message, message => message.topic)
  messages?: Message[];
}
