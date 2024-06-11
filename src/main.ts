import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setContact(
      'Anartz Mugika',
      'https://anartz-mugika.com/',
      'mugan86@gmail.com',
    )
    .setTitle('OSM with Overpass Turbo')
    .setDescription('Open Street Map API with Overpass Query language')
    .setVersion('1.0')
    .addTag('Osm with OverpassQL')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
