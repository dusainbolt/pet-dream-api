import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { MessageHelper } from './message.helper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService, MessageHelper],
  controllers: [MessageController],
  exports: [MessageHelper],
})
export class MessageModule {}
