import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByAccount(username);

    if (!user || !(await user.comparePassword(password))) {
      return null;
    }

    return user.toDto();
  }

  async login(user: any) {
    const u = user as User;
    const payload = { account: u.account, userID: u.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
