import { EntityRepository } from "@mikro-orm/mysql";
import { AccessTokensEntity } from "src/entities/access-tokens.entity";

export class AccessTokensRepository extends EntityRepository<AccessTokensEntity> {}