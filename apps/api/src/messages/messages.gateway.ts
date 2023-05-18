import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket  } from 'socket.io';
import { RoomService } from './room/room.service';
import { decode } from 'punycode';
import { Request, ExecutionContext } from '@nestjs/common';

export interface IRequest extends Request {
  session: any;
}

export function Logger(req: IRequest) {
  var temp = req.session.tokem;
  temp = decode(temp);
  console.log(temp);
  return temp.id; 
};

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

    this.serwer.in("").emit('message',message);
    //console.log(message);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  async findAll(context: ExecutionContext) {
    const req: IRequest = context.switchToHttp().getRequest();
    Logger(req);
    const messages = await this.messagesService.findAll();
    this.serwer.in("1").emit('messages',messages);
    console.log(messages);
    return messages;
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('join')
  async join(@MessageBody('name') name: string,@MessageBody('id') id: number, @ConnectedSocket() client: Socket)
  {
    this.room.setRoomID(id);
    var temp = await this.messagesService.identify(id, name, client.id);
    console.log(temp);
    this.serwer.on('connection', function(socket) {
      socket.join(this.room.roomIdTable[id].roomId);
    });
    return temp;
  }
}
