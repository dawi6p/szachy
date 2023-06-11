import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket  } from 'socket.io';
import { RoomService } from './room/room.service';
import { CreateChessDto } from './dto/create-chess.dto';
import { ScoreController } from 'src/score/score.controller';
import { ScoreService } from 'src/score/score.service';
import { MatchService } from 'src/match/match.service';
import { Match } from 'output/entities/Match';
var moment = require('moment');

@WebSocketGateway(
  {
    cors:
    {
      origin: '*',
    }
  }
)
export class MessagesGateway {
  @WebSocketServer() serwer: Server;
  constructor(private readonly messagesService: MessagesService, private readonly scoreService: ScoreService, private readonly matchService: MatchService, public room: RoomService) {  }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket) {
    const id = this.messagesService.clientToUser[client.id].id;

    const message = await this.messagesService.create(createMessageDto, client.id, this.room.roomIdTable[id].roomId);

    this.serwer.in(this.room.roomIdTable[id].roomId).emit('message',message);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  async findAll(@ConnectedSocket() client: Socket) {
    const id = this.messagesService.clientToUser[client.id].id;

    if(id == undefined) return;

    const messages = await this.messagesService.findAll(this.room.roomIdTable[id].roomId);
    this.serwer.in(this.room.roomIdTable[id].roomId).emit('messages',messages);

    return messages;
  }

  @SubscribeMessage('join')
  async join(@MessageBody('name') name: string, @MessageBody('id') id: number, @ConnectedSocket() client: Socket)
  {
    var b = this.room.setRoomID(id);

    var temp = await this.messagesService.identify(id, name, client.id);
    console.log(this.room)
    client.join(this.room.roomIdTable[id].roomId);
    client.emit("white", this.room.roomIdTable[id].white);

    if(b)
    {
      client.broadcast.in(this.room.roomIdTable[id].roomId).emit('giveId');
      const message = this.messagesService.getLatestChess(this.room.roomIdTable[id].roomId, id);
      client.emit('restoreChess',message);
    }
    else{
      if(this.room.isRoomFull()) this.serwer.in(this.room.roomIdTable[id].roomId).emit('otherPlayer',true);
    }

    return temp;
  }

  @SubscribeMessage('createChess')
  async createChess(@MessageBody() createChessDto: CreateChessDto, @ConnectedSocket() client: Socket) {
    const id = this.messagesService.clientToUser[client.id].id;

    const message = await this.messagesService.createChess(createChessDto, client.id, this.room.roomIdTable[id].roomId);
    client.broadcast.in(this.room.roomIdTable[id].roomId).emit('chessMove',message);

    return message;
  }

  @SubscribeMessage('oponentId')
  async oponentId(@MessageBody('id') id: number, @ConnectedSocket() client: Socket)
  {
    client.broadcast.in(this.room.roomIdTable[id].roomId).emit('opId',id);
  }

  @SubscribeMessage('gameEnded')
  async gameEnded(
    @MessageBody('id') id: number, 
    @MessageBody('opId') opId: number, 
    @MessageBody('fen') fen: string,
    @MessageBody('win') win: number, 
    @MessageBody('type') type: number, 
    @MessageBody('score') score: number, 
    @MessageBody('opScore') opScore: number, 
    @ConnectedSocket() client: Socket)
  {
    const match = new Match();

    let white = !this.room.roomIdTable[id].white; 
    if(white)
    {
      match.black = id;
      match.white = opId;
    }
    else
    {
      match.black = opId;
      match.white = id;
    }
    match.fenString = fen;
    match.typeId = type;
    match.win = win;
    match.date = moment().format('YYYY-MM-DD HH:mm:ss').toString();

    this.matchService.createMatch(match)

    let t = this.determineScore(white, score, opScore, win)

    this.scoreService.createScore(id, t.score)
    this.scoreService.createScore(opId, t.opScore)

    client.broadcast.in(this.room.roomIdTable[id].roomId).emit('gameEnd');

    this.room.remove(id)
    this.room.remove(opId)
  }

  private determineScore(white:boolean, score:number, opScore:number, win:number)
  {
    let diff = Math.floor(Math.pow(score - opScore, 2));
    let calPoints;
    let t = {
      score: score,
      opScore : opScore,
    }
    if(diff < 10) 
    {
      calPoints={
        1: 8,
        2: 0,
        3: 8,
      }
    }
    else
    {
      let b = Math.floor(8 - diff*0.1);
      if(b < 1) b = 1;
      calPoints={
        1: Math.floor(8 + diff*0.1), 
        2: Math.floor(1 + diff*0.05),
        3: b, 
      }
    }

    if(white)
    {
      if(opScore > score)
      {
        if(win < 4)
        {
          t.opScore += calPoints[1]
          t.score -= calPoints[1]
        }
        else if(win < 6)
        {
          t.opScore += calPoints[2]
          t.score -= calPoints[2]
        }
        else
        {
          t.opScore += calPoints[3]
          t.score -= calPoints[3]
        }
      }
      else
      {
        if(win < 4)
        {
          t.opScore += calPoints[3]
          t.score -= calPoints[3]
        }
        else if(win < 6)
        {
          t.opScore += calPoints[2]
          t.score -= calPoints[2]
        }
        else
        {
          t.opScore += calPoints[1]
          t.score -= calPoints[1]
        }
      }
    }
    else
    {
      if(opScore > score)
      {
        if(win < 4)
        {
          t.opScore -= calPoints[1]
          t.score += calPoints[1]
        }
        else if(win < 6)
        {
          t.opScore -= calPoints[2]
          t.score += calPoints[2]
        }
        else
        {
          t.opScore -= calPoints[3]
          t.score += calPoints[3]
        }
      }
      else
      {
        if(win < 4)
        {
          t.opScore -= calPoints[3]
          t.score += calPoints[3]
        }
        else if(win < 6)
        {
          t.opScore -= calPoints[2]
          t.score += calPoints[2]
        }
        else
        {
          t.opScore -= calPoints[1]
          t.score += calPoints[1]
        }
      }
    }

    if(t.score < 100) t.score = 100;
    if(t.opScore < 100) t.opScore = 100;
    return t;
  }
  
  /*@SubscribeMessage('findAllChess')
  async findAllChess(@ConnectedSocket() client: Socket) {
    const id = this.messagesService.clientToUser[client.id].id;

    if(id == undefined) return;

    const messages = await this.messagesService.findAllChess(this.room.roomIdTable[id].roomId);
    this.serwer.in(this.room.roomIdTable[id].roomId).emit('chessMoves',messages);
    console.log(messages);
    return messages;
  }*/
}
