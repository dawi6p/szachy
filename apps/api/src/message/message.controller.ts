import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class messageController {
    constructor(private readonly messageService: MessageService) {}

    @Get('MyHomeMessage')
    async getMessage(){
        let message = await this.messageService.findAll();
        return message;
    }

    @Post('edit')
    async edit(@Res() res, @Body('title') title: string, @Body('message') message: string){
        console.log("fe")
        let messaged = await this.messageService.findAll();
        let temp = messaged[1];
        temp.title = title;
        temp.message = message;
        this.messageService.edit(temp);

        return res.status(200).redirect('back');
    }
}
