import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { RoomService } from './room/room.service';
import { ScoreModule } from 'src/score/score.module';

@Module({
  providers: [MessagesGateway, MessagesService, RoomService],
  imports: [ScoreModule]
})
export class MessagesModule {}
