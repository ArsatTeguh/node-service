import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { accessToken } from './strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, accessToken]
})
export class UserModule { }
