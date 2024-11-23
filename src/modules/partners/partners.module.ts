import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { PartnersRepository } from 'src/repositories/partners.repository';

@Module({
  controllers: [PartnersController],
  providers: [PartnersService, PartnersRepository]
})
export class PartnersModule {}
