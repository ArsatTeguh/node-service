import { Body, Controller, Delete, Get, Param, Post, UseGuards, } from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { AuthGuard } from 'src/user/strategy/auth.guard';

@Controller('transaksi')
export class TransaksiController {
  constructor(private readonly transaksiService: TransaksiService) { }

  @UseGuards(AuthGuard)
  @Post(':id')
  add(@Param('id') id: string, @Body() count: { count: number }) {
    return this.transaksiService.create(+id, count);
  }

  @UseGuards(AuthGuard)
  @Get()
  get() {
    return this.transaksiService.get();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  find(@Param('id') id: string) {
    return this.transaksiService.find(+id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transaksiService.delete(+id);
  }

}
