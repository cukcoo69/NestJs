import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.findOne(username, password);
    if (user) {
      return { message: 'Login success', valid: true };
    }
    return { message: 'username/password is wrong', valid: false };
  }
}
