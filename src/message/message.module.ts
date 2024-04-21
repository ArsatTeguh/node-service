import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { databaseService } from './database.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, databaseService, MessageGateway],
})
export class MessageModule {}
