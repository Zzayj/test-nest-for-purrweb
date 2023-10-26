/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class CardDto {
    @ApiProperty({
        description: 'ID Карточки',
        example: "7ad384f8-1765-4ba0-aa03-49be6cffa77c",
        type: String,
        required: true
    })
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        description: 'ID колонки',
        example: "7ad384f8-1765-4ba0-aa03-49be6cffa77c",
        type: String,
        required: true
    })
    @IsUUID()
    @IsNotEmpty()
    list_id: string;

    @ApiProperty({
        description: 'Имя карточки',
        example: "Карточка №1",
        type: String,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Описание карточки',
        example: "Это моя карточка!",
        type: String,
        required: false
    })
    @IsString()
    description: string;
}
