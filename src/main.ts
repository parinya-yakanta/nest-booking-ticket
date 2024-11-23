import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import bodyParser from 'body-parser';
import { Logger } from 'nestjs-pino';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });
  
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
