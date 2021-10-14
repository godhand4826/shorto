import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  password: string;
}
