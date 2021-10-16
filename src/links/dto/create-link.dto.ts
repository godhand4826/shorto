import { IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLinkDto {
  @ApiProperty({ description: 'origin url' })
  @IsUrl()
  url: string;
}
