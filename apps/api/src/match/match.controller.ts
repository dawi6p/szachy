import { Controller, Get, Post, Query } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController 
{
    constructor(private readonly matchService: MatchService) {}

    @Get('/MatchResults')
    async lista(@Query() query){
        const MatchResults =  this.matchService.MatchResults(20);
        return MatchResults;
    }
}
