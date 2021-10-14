import { mapping } from 'auto-mapping';

export class UserDto {
  @mapping()
  id: number;

  @mapping()
  account: string;

  @mapping()
  createAt: Date;

  @mapping()
  updateAt: Date;
}
