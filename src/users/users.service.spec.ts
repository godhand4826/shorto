import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('register', async () => {
    jest.spyOn(repo, 'findOne').mockImplementation(async () => null);
    jest.spyOn(repo, 'create').mockImplementation(newUser => {
      const user = new User();
      user.id = 1;
      user.account = newUser.account;
      user.password = newUser.password;
      return user;
    });
    jest.spyOn(repo, 'save').mockImplementation(async user => {
      return user as User;
    });

    const newUser: CreateUserDto = { account: 'eric', password: 'pass' };
    const user = await service.register(newUser);

    expect(user.account).toEqual(newUser.account);
    expect((user as any).password).toBeUndefined();
  });

  it('register conflict', async () => {
    jest.spyOn(repo, 'findOne').mockImplementation(async () => new User());

    const newUser: CreateUserDto = { account: 'eric', password: 'pass' };

    await expect(service.register(newUser)).rejects.toThrow(ConflictException);
  });
});
