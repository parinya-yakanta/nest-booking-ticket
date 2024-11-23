import { Controller, Get, Version } from '@nestjs/common';

@Controller('partners')
export class PartnersController {
    @Version('1')
    @Get()
    getPartners() {
        return 'partners';
    }
}
