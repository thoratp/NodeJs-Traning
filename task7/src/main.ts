import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(resolve('./views'));
  console.log(resolve('./views'));
  app.setViewEngine('ejs');
  await app.listen(3000);
}
bootstrap();
