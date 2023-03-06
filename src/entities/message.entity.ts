import { ENTITY_NAME } from 'src/common/constant';
import { AbstractEntity } from 'src/common/interfaces';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Account } from './account.entity';
import { Topic } from './topic.entity';

@Entity(ENTITY_NAME.message)
export class Message extends AbstractEntity {
  @Column({ type: 'varchar', name: 'content' })
  content: string;

  @Column({ type: 'int', name: 'account_id', nullable: true })
  accountId: number;

  @Column({ type: 'int', name: 'topic_id', nullable: true })
  topicId: number;

  @ManyToOne(() => Account, account => account.messages)
  @JoinColumn({ name: 'account_id' })
  account?: Account;

  @ManyToOne(() => Topic, topic => topic.messages)
  @JoinColumn({ name: 'topic_id' })
  topic?: Topic;
}
