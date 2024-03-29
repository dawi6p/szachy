import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends } from 'output/entities/Friends';
import { Match } from 'output/entities/Match';
import { Matchtype } from 'output/entities/Matchtype';
import { Riddle } from 'output/entities/Riddle';
import { Riddlemove } from 'output/entities/Riddlemove';
import { Riddleuser } from 'output/entities/Riddleuser';
import { Score } from 'output/entities/Score';
import { User } from 'output/entities/User';
import { RolesGuard } from './decorators/roles.guards';
import { APP_GUARD } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { MatchModule } from './match/match.module';
import { ScoreModule } from './score/score.module';
import { MatchtypeModule } from './matchtype/matchtype.module';
import { message } from 'output/entities/message';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'szachy',
      entities: [Friends, Match, Matchtype, Riddle, Riddlemove, Riddleuser, Score, User, message],
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    AuthModule,
    UsersModule,
    MessagesModule,
    MatchModule,
    ScoreModule,
    MatchtypeModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
