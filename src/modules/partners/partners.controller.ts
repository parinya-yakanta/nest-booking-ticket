import { Controller, Get, Version } from '@nestjs/common';

@Controller('partners')
export class PartnerController {
  @Version('1')
  @Get()
  getPartner() {
    return 'partners';
  }
}
