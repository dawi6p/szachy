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
        const match = await this.matchRepository
            .createQueryBuilder("match")
            .where("match.white = :id", { id: ID })
            .orWhere("match.black = :id", { id: ID }).getMany()

        console.log(match)
        return match;
      }
}
