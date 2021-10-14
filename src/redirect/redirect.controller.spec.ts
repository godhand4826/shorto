import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from '../links/links.service';
import { RedirectController } from './redirect.controller';

describe('RedirectController', () => {
  let controller: RedirectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedirectController],
      providers: [LinksService],
    })
      .overrideProvider(LinksService)
      .useValue({})
      .compile();

    controller = module.get<RedirectController>(RedirectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
