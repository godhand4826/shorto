import { mapping } from 'auto-mapping';
import { Link } from '../link.entity';
import { encode } from '../codec';

export class LinkDto {
  @mapping()
  id: number;

  @mapping()
  url: string;

  @mapping()
  views: number;

  @mapping()
  createAt: Date;

  @mapping()
  updateAt: Date;

  @mapping((_value: any, _source: any, dest: Link) => encode(dest.id))
  shorten: string;
}
