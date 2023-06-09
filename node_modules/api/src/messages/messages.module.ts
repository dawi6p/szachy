import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { RoomService } from './room/room.service';
import { ScoreModule } from 'src/score/score.module';
import { MatchModule } from 'src/match/match.module';

@Module({
  providers: [MessagesGateway, MessagesService, RoomService],
  imports: [ScoreModule, MatchModule]
})
export class MessagesModule {}
