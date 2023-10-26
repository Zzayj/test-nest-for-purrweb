import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListDto } from './dto/list.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'src/guards/user.guard';

@ApiTags('Колонки')
@Controller('users/:userId/lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @ApiCreatedResponse({
    description: 'Колонка успешно добавлена.',
    type: ListDto,
  })
  @ApiOperation({ summary: 'Создать колонку' })
  @UseGuards(UserGuard)
  @Post()
  async createList(
    @Param('userId') userId: string,
    @Body() listDto: CreateListDto,
  ): Promise<ListDto> {
    try {
      return (await this.listsService.createOneList(
        userId,
        listDto.name,
        listDto.description,
      )) as ListDto;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({
    description: 'Выводит одну колонку по userId',
    type: ListDto,
  })
  @ApiOperation({ summary: 'Получить колонку по ID' })
  @Get()
  async getAllColumns(@Param('userId') id: string): Promise<ListDto[]> {
    try {
      return (await this.listsService.getAllListsByUserId(id)) as ListDto[];
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({
    description: 'Список колонок',
    type: [ListDto],
  })
  @ApiOperation({ summary: 'Получить список колонок' })
  @Get(':listId')
  async getById(@Param('listId') id: string): Promise<ListDto> {
    try {
      return (await this.listsService.getOneListById(id)) as ListDto;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({
    description: 'Колонка  обновлена',
  })
  @ApiOperation({ summary: 'Обновить карточку по её ID' })
  @UseGuards(UserGuard)
  @Post(':listId')
  async updateListById(
    @Param('listId') listId: string,
    @Body() listDto: UpdateListDto,
  ) {
    try {
      listDto.id = listId;
      return await this.listsService.updateListById(listDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({
    description: 'Колонка удалена',
  })
  @ApiOperation({ summary: 'Удалить карточку по её ID' })
  @UseGuards(UserGuard)
  @Delete(':listId')
  public async deleteListById(@Param('listId') listId: string) {
    try {
      return await this.listsService.deleteOneList(listId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
