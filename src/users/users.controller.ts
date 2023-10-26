import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserGuard } from 'src/guards/user.guard';

@Controller('users')
@ApiTags('Пользователь')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    description: 'Пользователь создан.',
    type: UserDto,
  })
  @ApiOperation({ summary: 'Создать пользователя' })
  @UseGuards(UserGuard)
  @Post()
  async createOneUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(
      createUserDto.email,
      createUserDto.password,
    );
  }
  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({
    description: 'Пользователи',
    type: [UserDto],
  })
  async findAll(): Promise<UserDto[]> {
    try {
      return (await this.usersService.getAllUsers()) as UserDto[];
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID Пользователя' })
  @ApiResponse({
    description: 'Пользователь',
    type: UserDto,
  })
  async getOneById(@Param('id') id: string): Promise<UserDto> {
    try {
      return (await this.usersService.getUserById(id)) as UserDto;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Patch(':id')
  @ApiResponse({
    description: 'Пользователь',
    type: UserDto,
  })
  @ApiOperation({ summary: 'Изменить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID Пользователя' })
  @UseGuards(UserGuard)
  updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.id = id;
    return this.usersService.updateUserById(updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID Пользователя' })
  @ApiResponse({
    description: 'Пользователь успешно удалён',
    type: String,
  })
  @UseGuards(UserGuard)
  deleteById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
