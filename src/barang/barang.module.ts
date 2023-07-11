import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ExcelParserMiddleware } from 'src/middleware/excel-parser.middleware';
import { BarangController } from './barang.controller';
import { BarangService } from './barang.service';

@Module({
  controllers: [BarangController],
  providers: [BarangService],
})
export class BarangModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExcelParserMiddleware).forRoutes({
      path: '/barang/bulk',
      method: RequestMethod.POST,
    });
  }
}
