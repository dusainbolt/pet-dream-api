import { Message } from 'src/entities/message.entity';
import { Topic } from 'src/entities/topic.entity';

export type RemindData = {
  fullName: string;
  email: string;
};

export type SocketSendMessageDto = { message: string; topicId: number; remindData?: RemindData };
export type SocketTopicMessagesReceiveDto = { message: Message; topic: Topic };
