import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<UserDto> {
    let user = await this.userRepo.findOne({
      where: { account: createUserDto.account },
    });
    if (user) {
      throw new ConflictException('User already exists');
    }

    user = this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    return user.toDto();
  }

  async findByAccount(account: string): Promise<User> {
    return this.userRepo.findOne({ where: { account } });
  }
}
