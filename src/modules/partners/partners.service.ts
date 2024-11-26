import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { PartnerRepository } from 'src/repositories/partner.repository';

@Injectable()
export class PartnerService {
  constructor(
    private readonly partnersRepository: PartnerRepository,
    private readonly em: EntityManager,
  ) {}
}
