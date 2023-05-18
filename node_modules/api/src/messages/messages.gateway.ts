import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket  } from 'socket.io';
import { RoomService } from './room/room.service';

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
  constructor(private readonly messagesService: MessagesService, public room: RoomService) {  }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket) {
    const message = await this.messagesService.create(createMessageDto, client.id);

    this.serwer.in(this.room.roomIdTable[client.id].roomId).emit('message',message);
    //console.log(message);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  async findAll(@ConnectedSocket() client: Socket) {
    const messages = await this.messagesService.findAll();
    this.serwer.in(this.room.roomIdTable[client.id].roomId).emit('messages',messages);
    console.log(messages);
    return messages;
  }

  /*@SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messagesService.findOne(id);
  }*/

  @SubscribeMessage('join')
  async join(@MessageBody('name') name: string,@MessageBody('id') id: number, @ConnectedSocket() client: Socket)
  {
    this.room.setRoomID(client.id);

    var temp = await this.messagesService.identify(id, name, client.id);
    console.log(this.room)
    client.join(this.room.roomIdTable[client.id].roomId);
    return temp;
  }
}
