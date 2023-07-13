import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ExcelParserMiddleware } from 'src/middleware/excel-parser.middleware';
import { accessToken } from 'src/user/strategy';
import { BarangController } from './barang.controller';
import { BarangService } from './barang.service';

@Module({
  imports: [
    JwtModule.register({}),
  ],
  controllers: [BarangController],
  providers: [BarangService, accessToken],
})
export class BarangModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExcelParserMiddleware).forRoutes({
      path: '/barang/bulk',
      method: RequestMethod.POST,
    });
  }
}
