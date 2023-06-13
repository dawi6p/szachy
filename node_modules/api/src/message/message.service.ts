import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { message } from 'output/entities/message';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(message)
        private messageRepository: Repository<message>,
      ) {}
    
    async findAll(): Promise<message[]> {
        return this.messageRepository.find();     
    }

    async edit(n: message): Promise<void>{
        await this.messageRepository.update({id:n.id}, {title:n.title, message:n.message})
    }
}