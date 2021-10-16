import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { decode } from './codec';
import { Link } from './link.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private linkRepo: Repository<Link>,
  ) {}

  async create(userID: number, url: string) {
    const link = this.linkRepo.create({ userID, url, views: 0 });
    await this.linkRepo.save(link);

    return link.toDto();
  }

  async findAll(userID: number) {
    const links = await this.linkRepo.find({ where: { userID } });
    return links.map(link => link.toDto());
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
}
