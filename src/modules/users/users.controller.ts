import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDTO, UpdateUserDTO } from './dto/create.dto';
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

  @ApiOperation({ summary: 'get user by id' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiBearerAuth()
  @UseGuards(TokenAuthGuard)
  @Version('1')
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'update user by id' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiBearerAuth()
  @UseGuards(TokenAuthGuard)
  @Version('1')
  @Put(':id')
  async updateUserById(@Param('id') id: number, @Body() dto: UpdateUserDTO) {
    return this.usersService.updateUserById(id, dto);
  }
}
