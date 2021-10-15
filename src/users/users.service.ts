import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
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
    return this.toDtoWithToken(user);
  }

  async login(verifyUserDto: VerifyUserDto): Promise<UserDto> {
    const { account, password } = verifyUserDto;
    const user = await this.userRepo.findOne({
      where: { account },
    });

    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedException('invalid account or password');
    }

    return this.toDtoWithToken(user);
  }

  private toDtoWithToken(user: User): UserDto {
    const token = jwt.sign({ id: user.id, account: user }, 'secret', {
      expiresIn: '10h',
    });
    return { ...user.toDto(), token };
  }
}
