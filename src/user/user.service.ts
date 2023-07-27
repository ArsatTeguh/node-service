import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Itoken } from './dto/tokenType';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private config: ConfigService) { }

  async create(createUserDto: CreateUserDto): Promise<{ username: string, email: string }> {
    const userExist = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email
      }
    })

    if (userExist) throw new ForbiddenException('Email telah tedaftar')
    const passwordMatch = await argon.hash(createUserDto.password)

    return await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: passwordMatch
      },
      select: {
        username: true,
        email: true
      }
    })



  }

  async login(user: { password: string, email: string }): Promise<Itoken> {
    const userExist = await this.prisma.user.findFirst({
      where: {
        email: user.email
      }
    })

    if (!userExist) throw new ForbiddenException('Email yang anda berikan salah')
    const passwordMatch = await argon.verify(userExist.password, user.password);

    if (!passwordMatch) throw new ForbiddenException('Password yang anda berikan salah')

    const token = await this.getToken(userExist.id, userExist.username)
    this.updateToken(userExist.id, token.access_token)
    return token

  }

  async logout(user: any) {
    return await this.prisma.user.update({
      where: {
        id: user.sub
      },
      data: {
        refresh_token: null
      }
    })
  }

  changePassword(updateUserDto: any) {
    return `This action updates a #${updateUserDto} user`;
  }

  async getToken(userId: number, username: string): Promise<Itoken> {
    const [access] = await Promise.all([
      this.jwtService.signAsync({ // this is access token
        sub: userId,
        username,
      }, {
        secret: this.config.get('SCREET_ACCESS_TOKEN'),
        expiresIn: '15m'
      }
      ),
    ])
    return {
      access_token: access,
    }
  }

  async updateToken(id: number, token: string) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        refresh_token: token
      }
    })
  }

}
