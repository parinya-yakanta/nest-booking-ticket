import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @ApiProperty({ example: 'app test' })
  name: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ example: 'test01@gmail.com' })
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(6)
  @ApiProperty({ example: '123456' })
  password: string;
}

export class CreateUserAccessTokenDto {
  @IsDefined()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
  userId: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'abcdef123456',
    description: 'AccessToken associated with the user',
    required: false,
  })
  token?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    example: '2023-12-31T23:59:59Z',
    description: 'Expiration date of the token',
    required: false,
  })
  expiresAt?: Date;
}
