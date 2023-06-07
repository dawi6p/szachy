import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket  } from 'socket.io';
import { RoomService } from './room/room.service';
import { CreateChessDto } from './dto/create-chess.dto';
import { ScoreController } from 'src/score/score.controller';
import { ScoreService } from 'src/score/score.service';

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
  constructor(private readonly messagesService: MessagesService, private readonly scoreService: ScoreService, public room: RoomService) {  }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket) {
    const id = this.messagesService.clientToUser[client.id].id;

    const message = await this.messagesService.create(createMessageDto, client.id, this.room.roomIdTable[id].roomId);

    this.serwer.in(this.room.roomIdTable[id].roomId).emit('message',message);
    //console.log(message);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  async findAll(@ConnectedSocket() client: Socket) {
    const id = this.messagesService.clientToUser[client.id].id;

    if(id == undefined) return;

    const messages = await this.messagesService.findAll(this.room.roomIdTable[id].roomId);
    this.serwer.in(this.room.roomIdTable[id].roomId).emit('messages',messages);
    //console.log(messages);
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

    //get score and send to oponent
    /*var score = await this.scoreService.getLatestScore(id)['score'];
    console.log(score)
    client.broadcast.in(this.room.roomIdTable[id].roomId).emit('opScore',score);*/

    if(b)
    {
      const message = this.messagesService.getLatestChess(this.room.roomIdTable[id].roomId, id);
      client.emit('restoreChess',message);
    }
    else{
      if(this.room.isRoomFull()) this.serwer.in(this.room.roomIdTable[id].roomId).emit('otherPlayer',true);
    }

    return temp;
  }

  @SubscribeMessage('oponentId')
  async oponentId( @MessageBody('id') id: number, @ConnectedSocket() client: Socket)
  {
    client.broadcast.in(this.room.roomIdTable[id].roomId).emit('opId',id);
  }

  @SubscribeMessage('createChess')
  async createChess(@MessageBody() createChessDto: CreateChessDto, @ConnectedSocket() client: Socket) {
    const id = this.messagesService.clientToUser[client.id].id;

    const message = await this.messagesService.createChess(createChessDto, client.id, this.room.roomIdTable[id].roomId);
    client.broadcast.in(this.room.roomIdTable[id].roomId).emit('chessMove',message);

    //console.log(message);
    return message;
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
