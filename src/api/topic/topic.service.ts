import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ADMIN_ID } from 'src/common/constant';
import { getDefaultQuery } from 'src/common/pagination';
import { Account } from 'src/entities/account.entity';
import { Message } from 'src/entities/message.entity';
import { Topic } from 'src/entities/topic.entity';
import { AppGateway } from 'src/gatewaies/app.gateway';
import { SocketService } from 'src/gatewaies/socket.service';
import { DeepPartial, LessThan } from 'typeorm';
import { AccountHelper } from '../account/account.helper.service';
import { FilterMessages, MessageHelper } from '../message/message.helper.service';
import { TopicCreateDto, TopicGetByAdmin, TopicGetByUserDto, TopicGetDetailDto } from './topic.dto';
import { TopicHelper } from './topic.helper.service';

@Injectable()
export class TopicService {
  constructor(
    private readonly topicHelper: TopicHelper,
    private socketService: SocketService,
    private readonly messageHelper: MessageHelper,
    private readonly accountHelper: AccountHelper, // private readonly appGateWay: AppGateway,
  ) {}

  async createTopic(account: Account, data: TopicCreateDto) {
    await this.topicHelper.checkCorrectTitle(account.id, data.title);
    const newTopicData: DeepPartial<Topic> = {
      title: data.title,
      accountId: account.id,
    };
    const topic = await this.topicHelper.insertTopic(newTopicData);
    const firstMessage: DeepPartial<Message> = {
      content: data.description,
      accountId: account.id,
      topicId: topic.id,
    };

    const message = await this.messageHelper.insertMessage(firstMessage);
    const topicUpdate = await this.topicHelper.updateTopic(topic.id, { latestMessageId: message.id });
    this.socketService.socket.emit('topic_received_admin', {
      ...topicUpdate,
      account: account,
      latestMessage: message,
    } as Topic);

    return topicUpdate;
  }

  async getTopicDetail(account: Account, topicId: number, query: TopicGetDetailDto) {
    console.log('account: ', account);
    const topicByOwner = await this.topicHelper.checkOwnerTopic(account.id, topicId);
    if (query.account === 'true' && topicByOwner?.accountId) {
      topicByOwner.account = await this.accountHelper.findAccount({ id: topicByOwner.accountId });
    }
    return topicByOwner;
  }

  async getTopicsOfUser(account: Account, data: TopicGetByUserDto) {
    const { take, skip, order, ...options } = getDefaultQuery(data);
    return await this.topicHelper.findTopics(
      { accountId: account.id },
      {
        take,
        skip,
        order,
        relations: { latestMessage: data.lastMessage === 'true', account: data.account === 'true' },
      },
    );
  }

  async getTopicsOnSystem(data: TopicGetByAdmin) {
    const { take, skip, order, ...options } = getDefaultQuery(data);
    return await this.topicHelper.findTopics(
      {},
      {
        take,
        skip,
        order,
        relations: { latestMessage: data.lastMessage === 'true', account: data.account === 'true' },
      },
    );
  }

  async getMessagesOfTopic(account: Account, topicId: number, data: TopicGetByUserDto) {
    await this.topicHelper.checkOwnerTopic(account.id, topicId);
    let { take, skip, order, ...options } = getDefaultQuery(data);

    let conditions: FilterMessages = { topicId };
    if (data.latestMessageId) {
      skip = 0;
      conditions = { ...conditions, id: LessThan(data.latestMessageId) as any };
    }
    return await this.messageHelper.findMessages(conditions, { take, skip, order });
  }
}
