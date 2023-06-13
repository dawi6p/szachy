import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { message } from 'output/entities/message';
import { MessageService } from './message.service';
import { messageController } from './message.controller';

@Module({
    imports: [TypeOrmModule.forFeature([message])],
    providers: [MessageService],
    controllers: [messageController]
})
export class MessageModule {}