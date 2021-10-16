import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'account' })
  @IsNotEmpty()
  account: string;

  @ApiProperty({ description: 'password' })
  @IsNotEmpty()
  password: string;
}
