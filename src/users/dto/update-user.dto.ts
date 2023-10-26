import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id?: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'mail@mail.ru',
    type: String,
    required: false,
  })
  @IsOptional()
  email?: string;
  @ApiProperty({
    description: 'Логин пользователя',
    example: 'user123',
    type: String,
    required: true,
  })
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '1234098765',
    type: String,
    required: true,
  })
  @IsOptional()
  @Length(8)
  password?: string;
}
