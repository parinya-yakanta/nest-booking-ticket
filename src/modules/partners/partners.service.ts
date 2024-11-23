import { Injectable } from '@nestjs/common';
import { PartnersRepository } from 'src/repositories/partners.repository';

@Injectable()
export class PartnersService {
    constructor(private readonly partnersRepository: PartnersRepository) {}
}
