import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'images'));
  app.useGlobalPipes(new ValidationPipe());
  const corsOptions = {
    origin: true, // Izinkan semua domain
    // credentials: true, // Izinkan kirim cookie dan header otentikasi (jika diperlukan)
  };
  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
