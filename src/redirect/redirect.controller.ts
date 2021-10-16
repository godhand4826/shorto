import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LinksService } from '../links/links.service';

@ApiTags('redirect')
@Controller('r')
export class RedirectController {
  constructor(private linksService: LinksService) {}

  @ApiOperation({ summary: 'redirect with a shorten link' })
  @Get(':shorten')
  @Redirect()
  async r(@Param('shorten') shorten: string) {
    const url = await this.linksService.findLongURL(shorten);
    return { url, statusCode: 301 };
  }
}
