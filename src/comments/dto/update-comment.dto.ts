import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  id?: string;
  @ApiProperty({
    description: 'Комментарий',
    example: 'Это мой комментарий!',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
