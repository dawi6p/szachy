import { Controller, Get, Post, Query, Session } from '@nestjs/common';
import { MatchService } from './match.service';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface IRequest extends Request {
    session: any;
}

@Controller('match')
export class MatchController 
{
    constructor(private readonly matchService: MatchService) {}

    @Get('/MatchResults')
    async lista(@Query() query, @Session() session: Record<string, any>){
        const jwtService = new JwtService()

        let temp = jwtService.decode(session.access_token)

        const MatchResults =  this.matchService.MatchResults(temp['id']);
        return MatchResults;
    }
}
