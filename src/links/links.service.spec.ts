import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { Link } from './entities/link.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('LinksService', () => {
  let service: LinksService;
  let repo: Repository<Link>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        {
          provide: getRepositoryToken(Link),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LinksService>(LinksService);
    repo = module.get<Repository<Link>>(getRepositoryToken(Link));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find long URL', async () => {
    const link = new Link();
    link.url = 'http://example.com';
    link.views = 0;
    jest.spyOn(repo, 'findOne').mockImplementation(async () => link);
    jest.spyOn(repo, 'save').mockImplementation(async link => link as Link);

    const url = await service.findLongURL('A');

    expect(url).toEqual(link.url);
    expect(link.views).toEqual(1);
  });

  it('could not find long URL', async () => {
    jest.spyOn(repo, 'findOne').mockImplementation(async () => null);

    await expect(service.findLongURL('A')).rejects.toThrow(NotFoundException);
  });
});
