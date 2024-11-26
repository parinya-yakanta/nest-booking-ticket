import { EntityRepository } from '@mikro-orm/mysql';
import { Partner } from 'src/entities/partners.entity';

export class PartnerRepository extends EntityRepository<Partner> {}
