import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('links')
@UseGuards(JwtAuthGuard)
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @ApiOperation({ summary: 'create a shorten link' })
  @Post()
  create(@Req() req, @Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(req.user.userID, createLinkDto.url);
  }

  @ApiOperation({ summary: 'get all user shorten links' })
  @Get()
  findAll(@Req() req) {
    return this.linksService.findAll(req.user.userID);
  }
}
