import { Module } from '@nestjs/common';
import { Match } from 'output/entities/Match';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Match])],
    providers: [MatchService],
    controllers: [MatchController],
    exports: [MatchService],
})

export class MatchModule {}
