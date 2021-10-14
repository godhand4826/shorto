import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { decode, encode } from './codec';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
  ) {}

  async create(createLinkDto: CreateLinkDto) {
    const url = createLinkDto.url;
    const link = this.linkRepo.create({ url, views: 0 });
    await this.linkRepo.save(link);
    return link.toDto();
  }

  async findAll() {
    const links = await this.linkRepo.find();
    return links.map(link => ({
      url: link.url,
      views: link.views,
      shorten: encode(link.id),
    }));
  }

  async findLongURL(shorten: string) {
    const id = decode(shorten);
    const link = await this.linkRepo.findOne(id);
    if (link) {
      link.views += 1;
      await this.linkRepo.save(link);
      return link.url;
    } else {
      throw new NotFoundException('requesting url is not found');
    }
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link with${updateLinkDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}
