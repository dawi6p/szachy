import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { Chess } from './entities/chess.entity';
import { CreateChessDto } from './dto/create-chess.dto';

@Injectable()
export class MessagesService {
  messages: Message[] = [];
  chessMoves: Chess[] = [];
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
    return Return;
  }

  createChess(createChessDto: CreateChessDto, clientId: string, idroom: number) {
    const message = {
      id: this.clientToUser[clientId].id,
      text: createChessDto.text,
      idRoom: idroom,
    };

    this.chessMoves.push(message);
    return message;
  }

  getLatestChess(idroom: number, userId: number)
  {
    var message;

    message = this.chessMoves.filter((chessMove) => chessMove.idRoom == idroom);
    message = message[message.length - 1];

    var turn = (message.id == userId);

    console.log(message.text.after)

    const boardState = {
      fen: message.text.after,
      turn: turn,
    }

    console.log(boardState);
    return boardState;
  }

  /*findAllChess(idroom: number) {
    const Return = this.chessMoves.filter(room => room.idRoom == idroom);
    console.log(Return[Return.length - 1]);
    return Return[Return.length - 1];
  }*/

  /*findOne(id: number) {
    return `This action returns a #${id} message`;
  }*/
}
