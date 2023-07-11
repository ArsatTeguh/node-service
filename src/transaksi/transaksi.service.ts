import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransaksiService {
  constructor(private prisma: PrismaService) { }

  async create(id: number, count: { count: number }) {
    const barangExist = await this.prisma.barang.findUnique({
      where: {
        id
      }
    })
    return await this.prisma.transaksi.create({
      data: {
        name: barangExist.name,
        count: count.count,
        id_barang: barangExist.id
      },
      select: {
        name: true,
        count: true,
        barang: true
      }
    });
  }

  async get() {
    const transaksi = await this.prisma.transaksi.findMany()
    return {
      data: transaksi,
      total: transaksi.length
    }
  }

  async find(id: number) {
    return await this.prisma.transaksi.findUnique({
      where: {
        id
      }
    })
  }

  async delete(id: number) {
    return await this.prisma.transaksi.delete({
      where: {
        id
      }
    })
  }


}
