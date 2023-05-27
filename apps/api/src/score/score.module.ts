import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from 'output/entities/Score';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';

@Module({ 
    imports: [TypeOrmModule.forFeature([Score])],
    providers: [ScoreService],
    controllers: [ScoreController],
    exports: [ScoreService],
})
export class ScoreModule {}
