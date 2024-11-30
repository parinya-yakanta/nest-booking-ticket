import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create.dto';
import { UsersService } from './users.service';
import { TokenAuthGuard } from '../auth/guard/token-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'register' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  @Version('1')
  @Post('register')
  async register(@Body() dto: CreateUserDTO) {
    return this.usersService.registerUser(dto);
  }

  @ApiOperation({ summary: 'get all users' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiBearerAuth()
  @UseGuards(TokenAuthGuard)
  @Version('1')
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
