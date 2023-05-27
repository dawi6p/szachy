import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'output/entities/Match';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService 
{
    constructor(
        @InjectRepository(Match)
        private matchRepository: Repository<Match>,
    ) {}

    async MatchResults(ID: number) {
        const matchW = await this.matchRepository
            .createQueryBuilder("match")
            .where("match.white = :id", { id: ID })
            .getMany()

        const matchB = await this.matchRepository
            .createQueryBuilder("match")
            .where("match.black = :id", { id: ID })
            .getMany()

        const WDL = {
            1:0,
            2:0,
            3:0,
            4:0,
            5:0,
            6:0,
            7:0,
            8:0,
        }

        for(let i = 0; i < matchW.length; i++)
        {
            WDL[matchW[i].win] = WDL[matchW[i].win] + 1;
        }

        let n = 0;
        for(let i = 0; i < matchB.length; i++)
        {
            if(matchB[i].win < 4) n = 5;
            else if(matchB[i].win > 5) n = -5;
            else n = 0;
            WDL[matchB[i].win + n] = WDL[matchB[i].win + n] + 1;
        }
        
        return WDL;
      }
}
