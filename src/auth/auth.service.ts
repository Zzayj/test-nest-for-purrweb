import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signin(email: string, password: string) {
    const candidate = await User.findOne({ where: { email: email } });
    if (!candidate) {
      throw new BadRequestException('Пользователь не найден');
    }
    if (!bcrypt.compare(password, candidate.password)) {
      throw new BadRequestException('Неправильный пароль');
    }
    const payload = { id: candidate.id, email: candidate.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
