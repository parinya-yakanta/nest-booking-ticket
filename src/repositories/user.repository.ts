import { EntityRepository } from '@mikro-orm/knex';
import { User } from 'src/entities/users.entity';

export class UserRepository extends EntityRepository<User> {}
