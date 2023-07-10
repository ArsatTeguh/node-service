import { Module } from '@nestjs/common';
import { BarangModule } from './barang/barang.module';
import { PrismaModule } from './prisma/prisma.module';



@Module({
  imports: [BarangModule, PrismaModule],
  providers: [],
})
export class AppModule { }
