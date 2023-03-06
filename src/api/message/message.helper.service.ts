import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { DeepPartial, FindOptionsOrder, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';

export type FilterMessages = FindOptionsWhere<Message>[] | FindOptionsWhere<Message>;
@Injectable()
export class MessageHelper {
  constructor(@InjectRepository(Message) private messageRepo: Repository<Message>) {}

  async insertMany(data: DeepPartial<Message>[]): Promise<Message[]> {
    return await this.messageRepo.save(data);
  }

  async insertMessage(data: DeepPartial<Message>): Promise<Message> {
    return await this.messageRepo.save(data);
  }
  async findMessages(
    filter: FindOptionsWhere<Message>[] | FindOptionsWhere<Message>,
    options: {
      order?: FindOptionsOrder<Message>;
      skip?: number;
      take?: number;
      relations?: FindOptionsRelations<Message>;
    },
  ): Promise<Message[]> {
    return await this.messageRepo.find({ where: filter, ...options });
  }
}
