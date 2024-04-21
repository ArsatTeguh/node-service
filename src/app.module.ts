import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BarangModule } from './barang/barang.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransaksiModule } from './transaksi/transaksi.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BarangModule,
    PrismaModule,
    TransaksiModule,
    UserModule,
    MessageModule,
  ],
})
export class AppModule {}
