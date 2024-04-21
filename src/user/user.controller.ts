import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { CreateUserDto, IResponseUser } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Itoken } from './dto/tokenType';
import { Request } from 'express';
import { AuthGuard } from './strategy/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ username: string; email: string }> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(
    @Body() createUserDto: { password: string; email: string },
  ): Promise<IResponseUser> {
    return this.userService.login(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Req() req: Request) {
    return this.userService.logout(req.user);
  }

  @Post(':id')
  forgotPassword(@Body() updateUserDto: any) {
    return this.userService.changePassword(updateUserDto);
  }

  @Get('get')
  async getAllUser() {
    return this.userService.getAllUser();
  }
}
