import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Matchtype } from 'output/entities/Matchtype';
import { Repository } from 'typeorm';

@Injectable()
export class MatchtypeService {
    constructor(
        @InjectRepository(Matchtype)
        private MatchtypeRepository: Repository<Matchtype>,
      ) {}
    async findAll(): Promise<Matchtype[]> {
        return this.MatchtypeRepository.find();     
    }
}