import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TransaksiService } from './transaksi.service';

@Controller('transaksi')
export class TransaksiController {
  constructor(private readonly transaksiService: TransaksiService) { }

  @Post(':id')
  add(@Param('id') id: string, @Body() count: { count: number }) {
    return this.transaksiService.create(+id, count);
  }

  @Get()
  get() {
    return this.transaksiService.get();
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.transaksiService.find(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transaksiService.delete(+id);
  }

}
