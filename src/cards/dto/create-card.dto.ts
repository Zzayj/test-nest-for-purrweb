import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'ID колонки',
    example: '7ad384f8-1765-4ba0-aa03-49be6cffa77c',
    type: String,
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  list_id: string;

  @ApiProperty({
    description: 'Имя карточки',
    example: 'Карточка №1',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Описание карточки',
    example: 'Это моя карточка!',
    type: String,
    required: false,
  })
  @IsString()
  description: string;
}
