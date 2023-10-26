import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthJwtDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  @ApiCreatedResponse({
    description: 'Успешно авторизован',
    type: AuthJwtDto,
  })
  @ApiOperation({ summary: 'Авторизация' })
  @Post('signin')
  public async signin(@Body() signInDto: CreateUserDto) {
    return await this.authService.signin(signInDto.email, signInDto.password);
  }

  @ApiCreatedResponse({
    description: 'Пользователь создан',
    type: AuthJwtDto,
  })
  @ApiOperation({ summary: 'Регистрация' })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(
      createUserDto.email,
      createUserDto.password,
    );
    const payload = { id: newUser.id, email: newUser.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
