import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ADMIN_ID } from 'src/common/constant';
import { ERROR_CODE } from 'src/common/interfaces';
import { Topic } from 'src/entities/topic.entity';
import { AppException } from 'src/middleware';
import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsRelationByString,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class TopicHelper {
  constructor(@InjectRepository(Topic) private topicRepo: Repository<Topic>) {}

  async insertTopic(data: DeepPartial<Topic>): Promise<Topic> {
    return await this.topicRepo.save(data);
  }

  async findTopic(filter: FindOptionsWhere<Topic>): Promise<Topic> {
    return await this.topicRepo.findOneBy(filter);
  }

  async updateTopic(id: number, data: DeepPartial<Topic>, isFindTopic = true): Promise<Topic> {
    await this.topicRepo.update({ id }, data);
    return isFindTopic ? await this.findTopic({ id }) : null;
  }

  async findTopics(
    filter: FindOptionsWhere<Topic>[] | FindOptionsWhere<Topic>,
    options: {
      order?: FindOptionsOrder<Topic>;
      skip?: number;
      take?: number;
      relations?: FindOptionsRelations<Topic> | FindOptionsRelationByString;
    },
  ): Promise<Topic[]> {
    return await this.topicRepo.find({ where: filter, ...options });
  }

  async checkCorrectTitle(userId, title) {
    const topic = await this.findTopic({ accountId: userId, title });
    if (!!topic) throw new AppException(ERROR_CODE.TOPIC_TITLE_EXIST_BY_ACCOUNT);
  }

  async checkOwnerTopic(userId, topicId): Promise<Topic> {
    const topic = await this.findTopic({ id: topicId });
    if (userId !== ADMIN_ID && topic?.accountId !== userId) throw new AppException(ERROR_CODE.TOPIC_DO_NOT_PERMISSION);
    return topic;
  }

  async updateLatestMessage(topicId, messageId): Promise<Topic> {
    return await this.updateTopic(topicId, { latestMessageId: messageId });
  }
}
