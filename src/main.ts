import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument, customOptions } from './modules/shared/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  SwaggerModule.setup('api/v1', app, createDocument(app), customOptions);

  await app.listen(3000);
}
bootstrap();
