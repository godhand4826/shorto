import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

class AuthDto /* for doc purposes only */ {
  @ApiProperty()
  account: string;
  @ApiProperty()
  password: string;
}

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'login with account and password' })
  @ApiBody({ type: AuthDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
