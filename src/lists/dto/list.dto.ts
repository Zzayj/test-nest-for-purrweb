/* eslint-disable prettier/prettier */
import { IsUUID, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID комментария' })
    id: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID Пользователя' })
    owner_id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Имя колонки' })
    name: string;

    @IsString()
    @ApiProperty({ description: 'Описание колонки' })
    description: string;
}
