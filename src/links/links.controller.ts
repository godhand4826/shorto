import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  create(@Req() req, @Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(req.user.userID, createLinkDto.url);
  }

  @Get()
  findAll(@Req() req) {
    return this.linksService.findAll(req.user.userID);
  }
}
