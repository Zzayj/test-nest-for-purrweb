/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDto extends PartialType(CreateListDto) {
    id?: string;
    @IsString()
    @ApiProperty({ description: 'Описание колонки' })
    description: string;
}
