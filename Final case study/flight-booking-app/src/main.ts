import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const builder =  new DocumentBuilder()
  .setTitle("Flight Booking Swagger")
    .setDescription("Flight Booking App description")
    .setVersion("v2.34")
    .setContact("lineage Capstone Project", "/", "demo@gmail.com")
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .build();
  const config = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup("api", app, config);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
// AppService.clusterize(bootstrap);
