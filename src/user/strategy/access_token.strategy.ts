import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { payloadUser } from "../dto/tokenType";
import { PrismaService } from "src/prisma/prisma.service";
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class accessToken extends PassportStrategy(Strategy, 'access_token') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('SCREET_ACCESS_TOKEN')
        })
    }

    async validate(payload: payloadUser) {
        const token = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })
        if (token.refresh_token === null) throw new UnauthorizedException('User invalid')
        return payload
    }
}
