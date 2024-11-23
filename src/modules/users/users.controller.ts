import { Controller, Get, Version } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Version('1')
    @Get()
    getUsers() {
        return 'users';
    }
}
