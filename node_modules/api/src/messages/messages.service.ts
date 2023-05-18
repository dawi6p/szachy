import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{id: -1, name: "nicosc", text: 'patrze sie na ciebie'}];
  clientToUser = {};

  identify(id: number,name: string, clientId: string)
  {
    this.clientToUser[clientId] = {id: id, name: name};
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string)
  {
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {
      id: this.clientToUser[clientId].id,
      name: this.clientToUser[clientId].name,
      text: createMessageDto.text,
    };
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }
}
