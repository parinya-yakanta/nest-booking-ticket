import { EntityRepository } from "@mikro-orm/mysql";
import { UsersEntity } from "src/entities/users.entity";

export class UsersRepository extends EntityRepository<UsersEntity> {}