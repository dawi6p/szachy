import { Controller, Get, Query, Session } from '@nestjs/common';
import { ScoreService } from './score.service';
import { JwtService } from '@nestjs/jwt';

@Controller('score')
export class ScoreController {
    constructor(private readonly scoreService: ScoreService) {}

    @Get('/getHistoryScore')
    async historyScore(@Query() query, @Session() session: Record<string, any>){
        const jwtService = new JwtService()

        let temp = jwtService.decode(session.access_token)

        const Results =  this.scoreService.getHistoryScore(temp['id']);
        return Results;
    }

    @Get('/getLatestScore')
    async latestScore(@Query() query, @Session() session: Record<string, any>){
        const jwtService = new JwtService()

        let temp = jwtService.decode(session.access_token)

        const Results =  this.scoreService.getLatestScore(temp['id']);
        return Results;
    }
}
