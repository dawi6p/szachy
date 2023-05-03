import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    singIn(@Res() res, @Body() singInDto: Record<string, any>){

        let user = this.authService.signIn(singInDto.username, singInDto.password);

        console.log(user)
        if(res.statusCode == 401) res.redirect("/Home");
        //else res.redirect("/Chess");
        return user;
    }
}