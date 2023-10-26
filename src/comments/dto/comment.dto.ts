/* eslint-disable prettier/prettier */
import { IsUUID, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {

    @ApiProperty({
        description: 'ID комментария',
        example: '7ad384f8-1765-4ba0-aa03-49be6cffa77c',
        type: String,
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        description: 'ID Карточки, под которой оставляют комментарий',
        example: "7ad384f8-1765-4ba0-aa03-49be6cffa77c",
        type: String,
        required: true
    })
    @IsUUID()
    @IsNotEmpty()
    card_id: string;

    @ApiProperty({
        description: 'ID пользователя оставившего комментарий',
        example: "7ad384f8-1765-4ba0-aa03-49be6cffa77c",
        type: String,
        required: true
    })
    @IsUUID()
    @IsNotEmpty()
    owner_id: string;

    @ApiProperty({
        description: 'Комментарий',
        example: "Это мой комментарий!",
        type: String,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    message: string;
}
