import { Module } from '@nestjs/common';
import { Matchtype } from 'output/entities/Matchtype';
import { MatchtypeController } from './matchtype.controller';
import { MatchtypeService } from './matchtype.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Matchtype])],
    providers: [MatchtypeService],
    controllers: [MatchtypeController],
    exports: [MatchtypeService],
})
export class MatchtypeModule {}