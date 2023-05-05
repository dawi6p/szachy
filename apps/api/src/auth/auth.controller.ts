import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async singIn(@Res() res, @Body() singInDto: Record<string, any>){

        let user = await this.authService.signIn(singInDto.username, singInDto.password);

        if(user['access_token'] != "Unauthorized") res.redirect('/Chess');
        else res.redirect('/Home');

        return user;
    }
}