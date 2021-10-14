import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { LinksService } from '../links/links.service';

@Controller('r')
export class RedirectController {
  constructor(private linksService: LinksService) {}

  @Get(':shorten')
  @Redirect()
  async r(@Param('shorten') shorten: string) {
    const url = await this.linksService.findLongURL(shorten);
    return { url, statusCode: 301 };
  }
}
