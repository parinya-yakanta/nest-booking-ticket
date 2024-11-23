import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import bodyParser from 'body-parser';
import { Logger } from 'nestjs-pino';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Booking Ticket API')
    .setDescription('The API Documentation for the Booking tickets application')
    .setVersion('1.0')
    .addTag('booking-tickets')
    .build();
    
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);

  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
