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
import { Timer, Time, TimerOptions } from 'timer-node';
const moment = require('moment');
const Elo = require('elo-calculator');

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
      let temp = { opTime: this.room.roomIdTable[opId].timer.ms(), time: this.room.roomIdTable[id].timer.ms() }//tutaj naprawić
      client.emit('time',temp);
      if(this.room.roomIdTable[id].white){
        this.room.roomIdTable[id].timer.resume();
      }else{
        this.room.startClockIfWhite();
      }
    }
    else{
      if(this.room.isRoomFull()) this.serwer.in(this.room.roomIdTable[id].roomId).emit('otherPlayer',true);
    }

    return temp;
  }

  @SubscribeMessage('createChess')
  async createChess(@MessageBody() createChessDto: CreateChessDto, @MessageBody('opId') opId: number, @ConnectedSocket() client: Socket) {
    const id = this.messagesService.clientToUser[client.id].id;

    this.room.roomIdTable[opId].timer.resume();

    console.log(this.room.roomIdTable[opId].timer.time());

    this.room.roomIdTable[id].timer.pause();

    console.log(this.room.roomIdTable[id].timer.time());

    let temp = { opTime: this.room.roomIdTable[opId].timer.ms(), time: this.room.roomIdTable[id].timer.ms() }

    const message = await this.messagesService.createChess(createChessDto, client.id, this.room.roomIdTable[id].roomId);
    client.broadcast.in(this.room.roomIdTable[id].roomId).emit('chessMove',message);
    client.emit('time',temp);

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

    let white = this.room.roomIdTable[id].white; 
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

    let t = await this.determineScore(white, id, opId, score, opScore, win)

    this.scoreService.createScore(id, t.score)
    this.scoreService.createScore(opId, t.opScore)

    client.broadcast.in(this.room.roomIdTable[id].roomId).emit('gameEnd');

    this.room.remove(id)
    this.room.remove(opId)
  }

  private async determineScore(white:boolean, id:number, opId:number, score:number, opScore:number, win:number)
  {
    let t = {
      score: score,
      opScore : opScore,
    }

    var elo = new Elo({rating: 100, k: [40, 20, 10]})
    var hScore = await this.scoreService.getHighestScore(id)
    var opHScore = await this.scoreService.getHighestScore(opId)
    var scoreCount = await this.scoreService.getScoreCount(id)
    var opScoreCount = await this.scoreService.getScoreCount(opId)
    

    var p1 = elo.createPlayer(score, scoreCount, hScore)
    var p2 = elo.createPlayer(opScore, opScoreCount, opHScore)

    if(white)
    {
      if(win < 4)
      {
        elo.updateRatings([[p1,p2,1]]);
      }
      else if(win < 6)
      {
        elo.updateRatings([[p1,p2,0.5]]);
      }
      else
      {
        elo.updateRatings([[p1,p2,0]]);
      }
    }
    else
    {
      if(win < 4)
      {
        elo.updateRatings([[p1,p2,0]]);
      }
      else if(win < 6)
      {
        elo.updateRatings([[p1,p2,0.5]]);
      }
      else
      {
        elo.updateRatings([[p1,p2,1]]);
      }
    }

    t.score = p1.rating;
    t.opScore = p2.rating;

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
