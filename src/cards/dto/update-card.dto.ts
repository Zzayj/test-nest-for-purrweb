import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @ApiProperty({
    description: 'ID карточки',
    example: '7ad384f8-1765-4ba0-aa03-49be6cffa77c',
    type: String,
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

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
