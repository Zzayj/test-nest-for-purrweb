/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'ID пользователя',
    example:"7ad384f8-1765-4ba0-aa03-49be6cffa77c",
    type: String,
    required: true
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Email пользователя',
    example:"mail@mail.ru",
    type: String,
    required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Логин пользователя',
    example:"user123",
    type: String,
    required: true
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example:"1234098765",
    type: String,
    required: true
  })
  @IsString()
  password: string;

}
