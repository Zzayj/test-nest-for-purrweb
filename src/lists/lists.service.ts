import { Injectable } from '@nestjs/common';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  async createOneList(ownerId: string, name: string, description?: string) {
    return await List.create({
      owner_id: ownerId,
      name: name,
      description: description,
    });
  }
  async getAllListsByUserId(id: string) {
    return await List.findAll({ where: { owner_id: id } });
  }

  async getOneListById(id: string) {
    return await List.findByPk(id);
  }

  async updateListById(listDto: UpdateListDto) {
    return await List.update(listDto, { where: { id: listDto.id } });
  }

  async deleteOneList(listId: string) {
    return await List.destroy({ where: { list_id: listId } });
  }
}
