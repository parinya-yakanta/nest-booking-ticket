import { EntityRepository } from "@mikro-orm/mysql";
import { PartnersEntity } from "src/entities/partners.entity";

export class PartnersRepository extends EntityRepository<PartnersEntity> {}