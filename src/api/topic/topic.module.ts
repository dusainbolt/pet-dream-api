import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from 'src/entities/topic.entity';
import { AccountModule } from '../account/account.module';
import { MessageModule } from '../message/message.module';
import { TopicAdminController, TopicController } from './topic.controller';
import { TopicHelper } from './topic.helper.service';
import { TopicService } from './topic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), MessageModule, AccountModule],
  providers: [TopicService, TopicHelper],
  controllers: [TopicController, TopicAdminController],
  exports: [TopicHelper],
})
export class TopicModule {}
