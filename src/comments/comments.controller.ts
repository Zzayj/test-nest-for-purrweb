import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  InternalServerErrorException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserGuard } from 'src/guards/user.guard';

@ApiTags('Комментарии')
@Controller('users/:userId/lists/:listId/cards/:cardId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiCreatedResponse({
    description: 'Коментарий создан.',
    type: CommentDto,
  })
  @ApiOperation({ summary: 'Создать комментарий' })
  @UseGuards(UserGuard)
  @Post()
  async createOne(
    @Param('cardId') cardId: string,
    @Body() commentDto: CreateCommentDto,
    @Req() req: Request
  ): Promise<CommentDto> {
    try {
      return (await this.commentsService.createOneComment(
        cardId,
        req['owner'],
        commentDto.message,
      )) as CommentDto;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({
    description: 'Все комментарии карточки:',
    type: [CommentDto],
  })
  @ApiOperation({ summary: 'Получить все комментарии карты' })
  @Get()
  async getAllByCardId(@Param('cardId') cardId: string): Promise<CommentDto[]> {
    try {
      return (await this.commentsService.getAllCommentsByCardId(
        cardId,
      )) as CommentDto[];
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({
    description: 'Комментарий:',
    type: CommentDto,
  })
  @ApiOperation({ summary: 'Получить комментарий по его ID' })
  @Get(':commentId')
  public async getOneById(
    @Param('commentId') commentId: string,
  ): Promise<CommentDto> {
    try {
      return (await this.commentsService.getOneCommentById(
        commentId,
      )) as CommentDto;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({
    description: 'Комментарий изменён',
  })
  @ApiOperation({ summary: 'Обновить коммеентарий по его ID' })
  @UseGuards(UserGuard)
  @Post(':commentId')
  public async updateOneById(
    @Param('commentId') commentId: string,
    @Body() commentDto: UpdateCommentDto,
  ) {
    try {
      commentDto.id = commentId;
      return this.commentsService.updateCommentById(commentDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({
    description: 'Комментарий успешно удалён',
  })
  @ApiOperation({ summary: 'Удалить коммеентарий по его ID' })
  @UseGuards(UserGuard)
  @Delete(':commentId')
  public async deleteOne(@Param('commentId') commentId: string) {
    try {
      return this.commentsService.deleteOneComment(commentId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
