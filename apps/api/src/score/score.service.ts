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

    async getPreviousScore(ID: number) {
        const score = await this.scoreRepository
            .createQueryBuilder("score")
            .where("score.userId = :id", { id: ID })
            .orderBy('score.date', 'DESC')
            .limit(2)
            .getMany()

        const response = score[1];
        return response;
    }

    async getLatestScore(ID: number) {
        const score = await this.scoreRepository
            .createQueryBuilder("score")
            .where("score.userId = :id", { id: ID })
            .orderBy('score.date', 'DESC')
            .limit(1)
            .getOne()

        return score;
    }

    async getLatestScoreName(ID: number) {
        const score = await this.scoreRepository
            .createQueryBuilder("score")
            .innerJoinAndSelect('score.user', 'user')
            .where("score.userId = :id", { id: ID })
            .orderBy('score.date', 'DESC')
            .limit(1)
            .getOne()

        return score;
    }

    async getHighestScore(ID: number) {
        const score = await this.scoreRepository
            .createQueryBuilder("score")
            .where("score.userId = :id", { id: ID })
            .orderBy('score.score', 'DESC')
            .limit(1)
            .getOne()

        return score;
    }

    async getScoreCount(ID: number) {
        const score = await this.scoreRepository
            .createQueryBuilder("score")
            .where("score.userId = :id", { id: ID })
            .getCount()

        return score;
    }

    async createScore(ID: number, points: number): Promise<void>{
        let score = new Score;

        score.score = points;
        score.date = moment().format('YYYY-MM-DD HH:mm:ss').toString();
        score.userId = ID;

        await this.scoreRepository.save(score);
      }
}
