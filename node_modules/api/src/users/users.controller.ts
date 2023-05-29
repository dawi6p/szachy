import { Body, Controller, Post, Get, Res, HttpException, Query, Req, UseGuards, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'output/entities/User';
import * as argon2 from "argon2";
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../users/users.service';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
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
            users.password = await argon2.hash(params.password);
            users.nickName = params.NickName;
            users.registrationDate = moment().format('YYYY-MM-DD').toString();
            users.adminPowerId = 0;

            this.usersService.save(users);
        }

        res.redirect('/Home');
    }

    @Get('/lista/usuwanie')
    async delete(@Res() res, @Query() query: { id: number }){
        let users = await this.usersService.findOneId(query.id);
        
        if(!users){
            throw new HttpException("Nie znaleziono takiego użytkownika!", 404);
        }

        users.deleted = moment().format('YYYY-MM-DD HH:mm:ss');

        this.usersService.deleted(users);

        res.redirect('back');
    }

    @Get('/listaUsers/banowanie')
    async ban(@Res() res, @Query() query: { id: number, date: Date }){
        let users = await this.usersService.findOneId(query.id);

        if(!users){
            throw new HttpException("Nie znaleziono takiego użytkownika!", 404);
        }

        users.bannedUntil = query.date;

        this.usersService.ban(users);

        res.redirect('back');
    }

    @Get('/listaUsers')
    async lista(@Query() query){
        const users = await this.usersService.findAll(query.szukany);
        return users;
    }

    //@Roles([UserRole.Admin])
    @UseGuards(AuthGuard)
    @Get('/User')
    async getUser(@Query() query: { id: number }){
        let users = await this.usersService.findOneId(query.id);
        return users;
    }


    @Post('changeEmail')
    async emailEdit(@Res() res, @Body() params: Record<string, any>, @Session() session: Record<string, any>){

        const jwtService = new JwtService()

        let temp = jwtService.decode(session.access_token)

        let users = await this.usersService.findOneId(temp['id']);

        if(!users){
            throw new HttpException("Nie znaleziono takiego użytkownika!", 404);
        }

        users.email = params.email;

        this.usersService.updateEmail(users);

        res.redirect('back');
    }

    @Post('changeNickName')
    async nickNameEdit(@Res() res, @Body() params: Record<string, any>, @Session() session: Record<string, any>){

        const jwtService = new JwtService()

        let temp = jwtService.decode(session.access_token)

        let users = await this.usersService.findOneId(temp['id']);

        console.log(users)

        if(!users){
            throw new HttpException("Nie znaleziono takiego użytkownika!", 404);
        }

        users.nickName = params.NickName;
        console.log(params.NickName)

        console.log(users)

        this.usersService.updateNickName(users);

        res.redirect('back');
    }

    @Post('changePassword')
    async passwordEdit(@Res() res, @Body() params: Record<string, any>, @Session() session: Record<string, any>){

        const jwtService = new JwtService()

        let temp = jwtService.decode(session.access_token)

        let users = await this.usersService.findOneId(temp['id']);

        if(!users){
            throw new HttpException("Nie znaleziono takiego użytkownika!", 404);
        }

        users.password = await argon2.hash(params.password);

        this.usersService.updatePassword(users);

        res.redirect('back');
    }
}