import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({
    description: 'Email',
    type: String,
    required: true,
    example: 'test01@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(4, { message: 'Password must be at least 4 characters' })
  @ApiProperty({
    description: 'Password',
    type: String,
    required: true,
    example: '123456',
  })
  password: string;
}
