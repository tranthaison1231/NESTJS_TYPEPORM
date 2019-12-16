import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, InternalServerErrorException } from '@nestjs/common';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  try {
    // const httpsOptions = {
    // 	key: fs.readFileSync('ssl/private.key'),
    // 	cert: fs.readFileSync('ssl/certificate.crt'),
    // 	ca: fs.readFileSync('ssl/ca_bundle.crt'),
    // }
    const logger = new Logger('bootstrap');

    const app = await NestFactory.create(AppModule, {
      // httpsOptions,
      cors: true,
    });

    // body parser
    app.use(bodyParser.json({ limit: '2mb' }));
    app.use(
      bodyParser.urlencoded({
        limit: '2mb',
        extended: true,
        parameterLimit: 2000,
      }),
    );

    if (process.env.NODE_ENV === 'development') {
      app.enableCors();
    } else {
      app.enableCors({ origin: 'http' });
      logger.log(`Accepting request from origin http`);
    }

    const port = Number(process.env.PORT) || 8080;

    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
    throw new InternalServerErrorException(error);
  }
}
bootstrap().catch(e => {
  throw e;
});
