import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { PinoLogger } from 'nestjs-pino';
import { Server, Socket } from 'socket.io';
import { AccountHelper } from 'src/api/account/account.helper.service';
import { AccountJWT } from 'src/api/account/account.interface';
import { MessageHelper } from 'src/api/message/message.helper.service';
import { TopicHelper } from 'src/api/topic/topic.helper.service';
import { ADMIN_ID } from 'src/common/constant';
import { IConfigRedis } from 'src/common/interfaces';
import { Generate } from 'src/common/utils/generate.utils';
import config from 'src/configs';
import { Account } from 'src/entities/account.entity';
import { MailService } from 'src/mail/mail.service';
import { SocketSendMessageDto, SocketTopicMessagesReceiveDto } from './interfaces/messages.interface';
import { SocketService } from './socket.service';

@WebSocketGateway(config.server.port + 1)
// @WebSocketGateway(config.server.port + 1, { cors: true, transports: ['websocket', 'polling'] })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private socketService: SocketService,
    private readonly logger: PinoLogger,
    private readonly jwtService: JwtService,
    private readonly accountHelper: AccountHelper,
    private readonly topicHelper: TopicHelper,
    private readonly messageHelper: MessageHelper,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  afterInit(server: any): any {
    this.logger.info(server, 'AppGateway Init: ');
    this.socketService.socket = server;
  }

  async handleConnection(client: Socket) {
    this.logger.info('Client connected: ' + client.id);
    const account = await this.getAccountFormSocket(client);
    if (!account) {
      client.disconnect();
      return;
    }
    // save info in cache
    await this.cacheManager.set(Generate.keySocketClient(client.id), account.id, {
      ttl: this.configService.get<IConfigRedis>('redis').ttlSocketClient,
    });
  }

  async handleDisconnect(client: Socket) {
    // need remove info in cache
    await this.cacheManager.del(Generate.keySocketClient(client.id));
    this.logger.info('Client disconnected: ' + client.id);
  }

  @SubscribeMessage('send_message')
  async receiveMessagesFromClient(@MessageBody() data: SocketSendMessageDto, @ConnectedSocket() client: Socket) {
    const userId: any = await this.cacheManager.get(Generate.keySocketClient(client.id));
    try {
      const newMessage = await this.messageHelper.insertMessage({
        content: data.message,
        accountId: userId,
        topicId: data.topicId,
      });
      const topic = await this.topicHelper.updateLatestMessage(data.topicId, newMessage.id);
      if (!!data?.remindData?.email) {
        this.mailService.remindUserReply(data.remindData);
      }
      this.server.emit(`message_received_${topic.accountId}`, {
        message: newMessage,
        topic,
      } as SocketTopicMessagesReceiveDto);
      this.server.emit(`message_received_admin`, { message: newMessage, topic } as SocketTopicMessagesReceiveDto);
    } catch (e) {
      this.logger.info(e, 'receiveMessagesFromClient ERROR:');
      this.server.emit(`message_received_${userId}`, Generate.errorSocket(e));
    }
  }

  // @SubscribeMessage('messages1111')
  async messages(client: Socket, payload: SocketSendMessageDto) {
    // const conversation = await this.conversationService.findById(payload.conversation_id, ['users']);
    // const userId = [];
    // conversation.users.map(user => {
    //   userId.push(user.id);
    //   return user;
    // });
    // const dataSocketId = await this.informationService.findSocketId(userId);
    // const message = await this.messageService.create({
    //   user_id: payload.user_id,
    //   status: false,
    //   message: payload.message,
    //   conversation_id: payload.conversation_id,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });
    // const dataUserConversation = await this.userConversationService.findDataUserConversation(
    //   message.user_id,
    //   message.conversation_id,
    // );
    // const messageId = typeof message.id === 'string' ? parseInt(message.id) : message.id;
    // await this.userConversationService.updateLastMessageId(dataUserConversation, messageId);
    // const emit = this.server;
    // dataSocketId.map(value => {
    //   emit.to(value.value).emit('message-received', {
    //     id: message.id,
    //     message: message.message,
    //     conversation_id: message.conversation_id,
    //     user_id: message.user_id,
    //     status: message.status,
    //     createdAt: message.createdAt,
    //     updatedAt: message.updatedAt,
    //   });
    // });
  }

  async getAccountFormSocket(client: Socket): Promise<Account> {
    const authToken: any = client.handshake?.query?.token;
    try {
      const decoded: AccountJWT = this.jwtService.verify(authToken);
      return await this.accountHelper.findAccount({ id: decoded.id });
    } catch (e) {
      this.logger.info(e, 'getAccountFormSocket Error: ');
    }
  }
}
