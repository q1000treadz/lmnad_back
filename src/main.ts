import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function initializeSwaggerDocumentation(
  app: INestApplication,
  swaggerPath: string,
) {
  const swaggerDocs = new DocumentBuilder()
    .setTitle('lmnad-back')
    .setDescription('The lmnad-back API description')
    .setVersion('1.0')
    .addTag('lmnad-back')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocs, {
    extraModels: [],
  });

  if (!existsSync('./public')) {
    mkdirSync('./public');
  }
  writeFileSync('./public/swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup(swaggerPath, app, document);
}


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const globalPrefix = '/api';
  const swaggerPath = `${globalPrefix}/swagger`;

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'files'),  {
    prefix: '/files/',
  });
  initializeSwaggerDocumentation(app, swaggerPath);
  await app.listen(process.env.PORT ? process.env.PORT : 3000);
  const url = await app.getUrl();
  Logger.log(`Application is running on: ${url}${globalPrefix}`);
  Logger.log(`Swagger path: ${url}${swaggerPath}`);
}
bootstrap();
