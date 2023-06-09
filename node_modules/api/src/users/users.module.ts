import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'output/entities/User';
import { UsersController } from './users.controller';
import { ScoreModule } from 'src/score/score.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ScoreModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}