import { Module } from '@nestjs/common';
import { PartnerController } from './partners.controller';
import { PartnerService } from './partners.service';
import { PartnerRepository } from 'src/repositories/partner.repository';

@Module({
  controllers: [PartnerController],
  providers: [PartnerService, PartnerRepository],
})
export class PartnerModule {}
