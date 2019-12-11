import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: 'http' });
    logger.log(`Accepting request from origin http`);
  }

  const port = Number(process.env.PORT) || 8080;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
