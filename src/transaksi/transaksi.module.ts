import { Module } from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { TransaksiController } from './transaksi.controller';
import { JwtModule } from '@nestjs/jwt';
import { accessToken } from 'src/user/strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [TransaksiController],
  providers: [TransaksiService, accessToken],
})
export class TransaksiModule { }
