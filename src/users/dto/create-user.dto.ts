import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'mail@mail.ru',
    type: String,
    required: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '1234098765',
    type: String,
    required: true,
  })
  @Length(8)
  @IsNotEmpty()
  password?: string;
}
