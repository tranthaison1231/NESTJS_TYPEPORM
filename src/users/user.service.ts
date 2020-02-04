import {
  Injectable,
  Get,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getAllUser(): Promise<User[]> {
    return this.userRepository.getAllUser();
  }

  async getUser(id: string): Promise<User> {
    const found = await this.userRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return found;
  }

  async deleteAllUser(): Promise<void> {
    try {
      await this.userRepository.clear();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUserById(id: string): Promise<void> {
    // const result = await this.userRepository.find(id);
    // if (result.affected === 0) {
    //   throw new NotFoundException(`User with ID "${id}" not found`);
    // }
  }

  async updateUser(id: string, userDto: UserDto): Promise<User> {
    const user = await this.getUser(id);
    user.email = userDto.email;
    await user.save();
    return user;
  }
}
