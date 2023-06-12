import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as session from 'express-session';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async singIn(@Res() res, @Body() singInDto: Record<string, any>, @Session() session: Record<string, any>){

        let user = await this.authService.signIn(singInDto.username, singInDto.password);

        session.access_token = user['access_token'];

        if(user['access_token'] != "Unauthorized") res.redirect('/MyHome');
        else res.redirect('/Login');
        
        return user;
    }

    @Get('logOut')
    async logOut(@Res() res, @Session() session: Record<string, any>){

        this.authService.logout(session.access_token);
        session.access_token = "";
        res.redirect('/MyHome');
    }
}