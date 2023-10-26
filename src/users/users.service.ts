import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  public async createUser(email: string, password: string) {
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);
    const currentUser = await User.create({
      email: email,
      password: hash,
      username: email.split('@')[0],
    });
    return currentUser;
  }
  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id: string) {
    return await User.findByPk(id);
  }

  async updateUserById(userDto: UpdateUserDto) {
    if (userDto.password) {
      const salt = 10;
      const hash = await bcrypt.hash(userDto.password, salt);
      userDto.password = hash;
    }
    return await User.update(userDto, { where: { id: userDto.id } });
  }

  async deleteUserById(userId: string) {
    return await User.destroy({ where: { id: userId } });
  }
}
