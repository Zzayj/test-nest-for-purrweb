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
import { CardsService } from './cards.service';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CardDto } from './dto/card.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { UserGuard } from 'src/guards/user.guard';

@ApiTags('Карточка')
@Controller('users/:userId/lists/:listId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Создать карточку' })
  @ApiCreatedResponse({
    description: 'Карточка успешно создана',
    type: CardDto,
  })
  public async createCard(
    @Param('listId') listId: string,
    @Body() cardDto: CreateCardDto,
  ): Promise<CardDto> {
    try {
      return (await this.cardsService.createOneCard(
        cardDto.name,
        listId,
        cardDto.description,
      )) as CardDto;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get()
  @ApiOperation({ summary: 'Получить все карточки' })
  @ApiCreatedResponse({
    description: 'Список карточек',
    type: [CardDto],
  })
  public async getCards(@Param('listId') id: string): Promise<CardDto[]> {
    try {
      return (await this.cardsService.getAllCardsByListId(id)) as CardDto[];
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  @Get(':cardId')
  @ApiOperation({ summary: 'Получить карточку по ID' })
  @ApiParam({ name: 'cardId', description: 'ID Карточки' })
  @ApiResponse({
    description: 'Карточка',
    type: CardDto,
  })
  public async getCardById(@Param('cardId') id: string): Promise<CardDto> {
    try {
      return (await this.cardsService.getOneCardById(id)) as CardDto;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  @Post(':cardId')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Обновить карточку' })
  @ApiParam({ name: 'cardId', description: 'ID Карточки' })
  @ApiResponse({
    description: 'Карточка обновлена',
  })
  public async updateCardById(
    @Param('cardId') cardId: string,
    @Body() cardDto: UpdateCardDto,
  ) {
    try {
      cardDto.id = cardId;
      return await this.cardsService.updateCardById(cardDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':cardId')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Удалить карточку' })
  @ApiParam({ name: 'cardId', description: 'ID Карточки' })
  @ApiResponse({
    description: 'Карточка удалена',
  })
  public async deleteCardById(@Param('cardId') cardId: string) {
    try {
      return this.cardsService.deleteCardById(cardId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
