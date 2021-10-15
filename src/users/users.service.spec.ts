import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { User } from './entities/user.entity';
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
    expect(user.token).toBeDefined();
    expect(user.token.length).not.toBe(0);
  });

  it('register conflict', async () => {
    jest.spyOn(repo, 'findOne').mockImplementation(async () => new User());

    const newUser: CreateUserDto = { account: 'eric', password: 'pass' };

    await expect(service.register(newUser)).rejects.toThrow(ConflictException);
  });

  it('login', async () => {
    const user = new User();
    user.account = 'eric';
    user.password = 'pass';
    jest.spyOn(repo, 'findOne').mockImplementation(async () => user);
    jest.spyOn(user, 'comparePassword').mockImplementation(async function (p) {
      return p == this.password;
    });

    const claim: VerifyUserDto = { account: 'eric', password: 'pass' };
    const u = await service.login(claim);

    expect(u.account).toEqual(user.account);
    expect((u as any).password).toBeUndefined();
    expect(u.token).toBeDefined();
    expect(u.token.length).not.toBe(0);
  });
});
