import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
}
