import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
import * as bodyParser from 'body-parser';
import { NODE_ENV, PORT } from './environments';

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

    if (NODE_ENV === 'development') {
      app.enableCors();
    } else {
      app.enableCors({ origin: 'http' });
      logger.log(`Accepting request from origin http`);
    }

    // SWAGGER
    const options = new DocumentBuilder()
      .setTitle('Product Example')
      .setDescription('Products API description')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('document', app, document);

    await app.listen(PORT);
    logger.log(`Application listening on port ${PORT}`);
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
    throw new InternalServerErrorException(error);
  }
}
bootstrap().catch(e => {
  throw e;
});
