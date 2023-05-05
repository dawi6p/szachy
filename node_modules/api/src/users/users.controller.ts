import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'output/entities/User';
var moment = require('moment');

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    @Post('rejestracja')
    async addUpdateForm(@Res() res, @Body() params: Record<string, any>){
        let users = await this.usersService.findOne(params.email);

        if(!users){
            users = new User();
            users.email = params.email;
            users.password = params.password;
            users.nickName = params.NickName;
            users.registrationDate = moment().format('YYYY-MM-DD').toString();
            users.adminPowerId = 0;

            this.usersService.save(users);
        }

        res.redirect('/Home');
    }
}