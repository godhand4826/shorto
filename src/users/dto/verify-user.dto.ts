import { IsNotEmpty } from 'class-validator';

export class VerifyUserDto {
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  password: string;
}
