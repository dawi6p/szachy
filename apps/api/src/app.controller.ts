import { Controller, Get, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  //constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Session() session: Record<string, any>): string {
    return session.access_token;
  }
}
