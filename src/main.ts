import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const appOptions = { bufferLogs: true, cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.enableShutdownHooks();
  app.useLogger(app.get(Logger));

  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Booking Ticket API')
    .setDescription('The API Documentation for the Booking tickets application')
    .setVersion('1.0')
    .addTag('booking-tickets')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.APP_PORT ?? 3000);
}

bootstrap();
