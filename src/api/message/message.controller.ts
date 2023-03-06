import { Controller } from '@nestjs/common';
import { ENTITY_NAME } from 'src/common/constant';
import { IsAuthController } from 'src/common/decorators';

@IsAuthController(ENTITY_NAME.message, 'Message')
export class MessageController {}
