import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'output/entities/Match';
import { User } from 'output/entities/User';
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

      async Match(ID: number, limit :number) {
        const match = await this.matchRepository
            .createQueryBuilder("match")
            .innerJoinAndSelect('match.matchtype', 'machtype')
            .innerJoinAndSelect('match.black2', 'black2')
            .innerJoinAndSelect('match.white2', 'white2')
            .where("match.white = :id", { id: ID })
            .orWhere("match.black = :id", { id: ID })
            .orderBy('match.date', 'DESC')
            .limit(limit)
            .getMany()

        return match
      }

      async createMatch(match: Match)
      {
        await this.matchRepository.save(match);
      }
}
