import { Injectable } from '@nestjs/common';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  async createOneComment(cardId: string, ownerId: string, message: string) {
    return await Comment.create({
      card_id: cardId,
      owner_id: ownerId,
      message: message,
    });
  }
  async getAllCommentsByCardId(id: string) {
    return await Comment.findAll({ where: { card_id: id } });
  }

  async getOneCommentById(id: string) {
    return await Comment.findByPk(id);
  }

  public async updateCommentById(listDto: UpdateCommentDto) {
    return await Comment.update(listDto, { where: { id: listDto.id } });
  }

  public async deleteOneComment(id: string) {
    return await Comment.destroy({ where: { id: id } });
  }
}
