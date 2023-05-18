import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { RoomService } from './room/room.service';

@Module({
  providers: [MessagesGateway, MessagesService, RoomService]
})
export class MessagesModule {}
