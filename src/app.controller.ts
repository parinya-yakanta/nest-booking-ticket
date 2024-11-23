import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Version('1')
  @Get('hollo')
  getHello(): string {
    return this.appService.getHello();
  }
  @Version('2')
  @Get('hollo')
  getHelloV2(): string {
    return this.appService.getHelloV2();
  }
}
