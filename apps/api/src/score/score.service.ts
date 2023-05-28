import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from 'output/entities/Score';
import { Repository } from 'typeorm';
var moment = require('moment');

@Injectable()
export class ScoreService {

    constructor(
        @InjectRepository(Score)
        private scoreRepository: Repository<Score>,
    ) {}

    async getHistoryScore(ID: number) {

        const score = await this.scoreRepository
            .createQueryBuilder("score")
            .where("score.userId = :id", { id: ID })
            .getMany()

        return score;
    }

    async getLatestScore(ID: number) {
        const score = await this.scoreRepository
            .createQueryBuilder("score")
            .where("score.userId = :id", { id: ID })
            .orderBy('score.date', 'DESC')
            .limit(1)
            .getOne()

        console.log(score)
        return score;
    }

    async createScore(ID: number, points: number): Promise<void>{
        let score = new Score;

        score.score = points;
        score.date = moment().format('YYYY-MM-DD').toString();
        score.userId = ID;

        await this.scoreRepository.save(score);
      }
}