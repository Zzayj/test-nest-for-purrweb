import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'ID пользователя оставившего комментарий',
    example: '7ad384f8-1765-4ba0-aa03-49be6cffa77c',
    type: String,
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  owner_id: string;

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
