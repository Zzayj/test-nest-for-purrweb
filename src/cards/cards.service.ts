import { Injectable } from '@nestjs/common';
import { Card } from './entities/card.entity';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  public async getAllCardsByListId(id: string) {
    return Card.findAll({ where: { list_id: id } });
  }

  public async getOneCardById(id: string) {
    return Card.findByPk(id);
  }

  public async createOneCard(name: string, listId: string, description?: string) {
    return Card.create({
      name: name,
      list_id: listId,
      description: description,
    });
  }

  public async deleteCardById(id: string) {
    return Card.destroy({ where: { id: id } });
  }

  public async updateCardById(cardDto: UpdateCardDto) {
    return Card.update(cardDto, { where: { id: cardDto.id } });
  }
}
