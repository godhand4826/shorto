import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { Link } from './entities/link.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LinksService', () => {
  let service: LinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        {
          provide: getRepositoryToken(Link),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LinksService>(LinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
