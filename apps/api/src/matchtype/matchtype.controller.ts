import { Controller, Get, Query } from '@nestjs/common';
import { MatchtypeService } from './matchtype.service';

@Controller('matchtype')
export class MatchtypeController {
    constructor(private readonly matchtypeService: MatchtypeService) {}

    @Get('getAllMatchtype')
    async getAllMatchtype(){
        let matchtype = await this.matchtypeService.findAll();
        return matchtype;
    }

    @Get('getMatchTypeId')
    async getMatchTypeId(@Query() query: { id: number }){
        return await this.matchtypeService.getById(query.id);
    }
}
