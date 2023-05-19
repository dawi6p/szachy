import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { chess } from './entities/chess.entity';
import { CreateChessDto } from './dto/create-chess.dto';

@Injectable()
export class MessagesService {
  messages: Message[] = [{id: -1, name: "nicosc", text: 'patrze sie na ciebie', idRoom: 1}];
  chessMoves: chess[] = [{id: -1, move: 'patrze sie na ciebie', idRoom: 1}];
  clientToUser = {};

  identify(id: number,name: string, clientId: string)
  {
    this.clientToUser[clientId] = {id: id, name: name};
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string)
  {
    return this.clientToUser[clientId].id;
  }

  create(createMessageDto: CreateMessageDto, clientId: string, idroom: number) {
    const message = {
      id: this.clientToUser[clientId].id,
      name: this.clientToUser[clientId].name,
      text: createMessageDto.text,
      idRoom: idroom,
    };

    this.messages.push(message);
    return message;
  }

  findAll(idroom: number) {
    const Return = this.messages.filter(room => room.idRoom == idroom);
    //console.log(Return);
    return Return;
  }

  createChess(createChessDto: CreateChessDto, clientId: string, idroom: number) {
    const message = {
      id: this.clientToUser[clientId].id,
      move: createChessDto.move,
      idRoom: idroom,
    };

    this.chessMoves.push(message);
    return message;
  }

  findAllChess(idroom: number) {
    const Return = this.chessMoves.filter(room => room.idRoom == idroom);
    console.log(Return);
    return Return;
  }

  /*findOne(id: number) {
    return `This action returns a #${id} message`;
  }*/
}
