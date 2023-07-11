import { Module } from '@nestjs/common';
import { BarangModule } from './barang/barang.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransaksiModule } from './transaksi/transaksi.module';
import { UserModule } from './user/user.module';



@Module({
  imports: [BarangModule, PrismaModule, TransaksiModule, UserModule],
  providers: [],
})
export class AppModule { }
