import { Body, Controller, Post, Get, Res, HttpException, Query } from '@nestjs/common';
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

    @Post('/lista/usuwanie')
    async delete(@Res() res, @Body() params: Record<string, any>){
        let users = await this.usersService.findOne(params.id);

        if(!users){
            throw new HttpException("Nie znaleziono takiego użytkownika!", 404);
        }

        users.deleted = new Date(Date.now());

        this.usersService.deleted(users);

        res.redirect('/Home');
    }

    @Post('/listaUsers/banowanie')
    async ban(@Res() res, @Body() params: Record<string, any>){
        let users = await this.usersService.findOne(params.id);

        if(!users){
            throw new HttpException("Nie znaleziono takiego użytkownika!", 404);
        }

        users.bannedUntil = new Date(Date.now());

        this.usersService.ban(users);

        res.redirect('/Home');
    }

    @Get('/listaUsers')
    async lista(@Query() query){
        const users = await this.usersService.findAll(query.szukany);
        return users;
    }
}